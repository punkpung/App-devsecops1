"use client";

import { cn } from "@/lib/utils";
import { marked } from "@/lib/marked";
import React from "react";
import { Message } from "ai/react";

interface ConversationProps {
  messages: Message[];
}

export const Conversation = React.forwardRef<HTMLDivElement, ConversationProps>(
  ({ messages }: ConversationProps, ref) => {
    return (
      <>
        <div className={"space-y-10 px-2"} ref={ref}>
          {messages.map((item, i) => (
            <ChatItem key={i} detail={item} />
          ))}
        </div>
      </>
    );
  },
);

Conversation.displayName = "Conversation";

interface ChatItemProps {
  detail: Message;
}

const ChatItem = ({ detail }: ChatItemProps) => {
  const isAssistant = detail.role === "assistant";

  return (
    <>
      <div
        className={cn("relative flex", {
          "justify-start": isAssistant,
          "justify-end": !isAssistant,
        })}
      >
        <div
          className={cn("flex w-full flex-col", {
            "items-end text-end": !isAssistant,
            "text-start": isAssistant,
          })}
        >
          <div className={cn("mb-2 text-xl font-semibold text-white")}>
            {detail.role === "assistant" ? "Gemini" : "You"}
          </div>
          <div
            className={cn("content", {
              model: isAssistant,
              me: !isAssistant,
            })}
            dangerouslySetInnerHTML={{ __html: marked.parse(detail.content) }}
          />
        </div>
      </div>
    </>
  );
};
