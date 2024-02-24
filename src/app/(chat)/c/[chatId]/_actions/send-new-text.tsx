"use server";

import { headers } from "next/headers";
import {
  GoogleGenerativeAIStream,
  Message,
  experimental_StreamingReactResponse,
} from "ai";
import { genAI } from "@/lib/gemini";
import { db } from "@/lib/db";
import { messages as messagesType } from "@/lib/db/schema/schema";
import { revalidatePath } from "next/cache";

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant",
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export const handler = async ({ messages }: { messages: Message[] }) => {
  const headersList = headers();

  const chatId = headersList.get("referer")?.split("/").pop();

  const model = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(buildGoogleGenAIPrompt(messages!));

  const stream = GoogleGenerativeAIStream(model, {
    onStart: async () => {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.role === "user") {
        const data = {
          role: "user",
          roomPublicId: chatId,
          parts: latestMessage.content,
        };

        await db.insert(messagesType).values(data);
      }
    },
    onFinal: async (completion) => {
      const data = {
        role: "assistant",
        parts: completion,
        roomPublicId: chatId,
      };

      await db.insert(messagesType).values(data);

      revalidatePath("/c");
    },
  });

  return new experimental_StreamingReactResponse(stream, {
    ui({ content }) {
      return <div>{content}</div>;
    },
  });
};
