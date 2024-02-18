import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { genAI } from "@/lib/gemini";
import { db } from "@/lib/db";

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

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();

    const model = await genAI
      .getGenerativeModel({ model: "gemini-pro" })
      .generateContentStream(buildGoogleGenAIPrompt(messages!));

    const stream = GoogleGenerativeAIStream(model, {
      onStart: async () => {
        const latestMessage = messages[messages.length - 1];
        if (latestMessage.role === "user") {
          const data = {
            role: "user",
            parts: latestMessage.content,
            roomPublicId: chatId,
          };

          console.log("start", data);

          // await db.insert(messages).values(data);
        }
      },
      onCompletion: async (completion) => {
        const data = {
          role: "assistant",
          parts: completion,
          roomPublicId: chatId,
        };

        console.log("completion", data);
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
