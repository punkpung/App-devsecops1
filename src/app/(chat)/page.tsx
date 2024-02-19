import { db } from "@/lib/db";
import { CreateChatInput, SubbmitButton } from "./_components/Form";
import { rooms } from "@/lib/db/schema/schema";
import { nanoid } from "@/lib/utils";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export default function HomePage() {
  async function createChat(formData: FormData) {
    "use server";
    const chatName = formData.get("chatName") as string;

    if (chatName) {
      const chatId = nanoid();

      await db.insert(rooms).values({
        name: chatName,
        publicId: chatId,
      });

      revalidateTag("rooms");
      redirect(`/c/${chatId}`);
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <form action={createChat}>
        <div className="w-full max-w-lg rounded-md border">
          <div className="h-[50px] border-b "></div>
          <div className="flex flex-col gap-4 py-12 pl-10">
            <div className="flex text-sm text-neutral-500">
              <div className="w-32 text-sm">Chat Name</div>
              <div className="flex flex-col gap-4">
                <p>
                  In each chat, Gemini will remember the previous messages you
                  send in it
                </p>
                <CreateChatInput />
              </div>
            </div>
          </div>
          <div className="flex h-[50px] items-center justify-end border-t">
            <SubbmitButton />
          </div>
        </div>
      </form>
    </div>
  );
}
