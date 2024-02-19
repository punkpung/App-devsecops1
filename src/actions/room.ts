"use server";
import { db } from "@/lib/db";
import { rooms } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";
import { deleteAllMessagesByChatId } from "./message";
import { unstable_cache as cache, revalidateTag } from "next/cache";

export const getRoomEntries = cache(
  async () => {
    try {
      return await db.select().from(rooms);
    } catch (e) {
      console.log(e);
    }
  },
  ["rooms"],
  { tags: ["rooms"] },
);

export const getRoomName = async (chatId: string) => {
  const result = await db
    .select({
      name: rooms.name,
    })
    .from(rooms)
    .where(eq(rooms.publicId, chatId));

  if (result.length === 0) {
    return;
  }

  return result[0].name;
};

export const deleteRoomById = async (chatId: string) => {
  try {
    deleteAllMessagesByChatId(chatId).then(async () => {
      await db.delete(rooms).where(eq(rooms.publicId, chatId));

      revalidateTag("rooms");
    });
  } catch (e) {
    console.log(e);
  }
};
