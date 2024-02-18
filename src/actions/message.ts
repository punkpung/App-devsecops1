"use server";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";

export const getChatHistoryEntries = async (chatId: string) => {
  if (!chatId) {
    return;
  }

  try {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.roomPublicId, chatId));
  } catch (e) {
    console.log(e);
  }
};

export const deleteAllMessagesByChatId = async (chatId: string) => {
  try {
    await db.delete(messages).where(eq(messages.roomPublicId, chatId));
  } catch (e) {
    console.log(e);
  }
};
