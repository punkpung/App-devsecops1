import { getChatHistoryEntries } from "@/actions/message";
import { Suspense } from "react";
import { Chat } from "./_components/Chat";
import { handler } from "./_actions/send-new-text";
import { getRoomName } from "@/actions/room";
import { redirect } from "next/navigation";

// export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { chatId: string };
}) {
  let chatName = await getRoomName(params.chatId);
  return {
    title: `${chatName || params.chatId}`,
  };
}

export default async function ChatPage({
  params,
}: {
  params: { chatId: string };
}) {
  let messages = await getChatHistoryEntries(params.chatId);
  let chatName = await getRoomName(params.chatId);

  if (!messages) {
    messages = [];
  }

  if (!chatName) {
    redirect("/");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="h-16 px-8">
        <h1>Chat Page : {chatName || params.chatId}</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Chat messages={messages} handler={handler} chatId={params.chatId} />
      </Suspense>
    </div>
  );
}
