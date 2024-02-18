"use client";
import type { Message } from "@/types";
import { useChat } from "ai/react";
import { Conversation } from "./Converation";
import { useRef, useEffect } from "react";

export const Chat = ({
  messages: initialMessage,
  handler,
  chatId,
}: {
  messages: Message[];
  handler: any;
  chatId: string;
}) => {
  const { messages, isLoading, handleSubmit, input, handleInputChange } =
    useChat({
      body: { chatId: chatId },
      api: handler,
      initialMessages: initialMessage.map((message) => ({
        id: `${message.id}`,
        role: message.role as "user" | "assistant",
        content: message.parts,
      })),
    });

  const scrollToElem = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollToElem.current) {
      scrollToElem.current.scrollIntoView({ behavior: "smooth", block: "end" });
      inputRef.current?.focus();
    }
  }, [messages, isLoading]);

  return (
    <>
      <div className="conversation-scroll mx-auto flex w-full max-w-screen-lg flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 pb-10 pt-4">
        <Conversation messages={messages} />
        <div ref={scrollToElem} className="basis-2" />
      </div>
      <div className="relative flex h-20 justify-center pt-4">
        <form onSubmit={handleSubmit} className="min-w-full px-4">
          <div className="mx-auto mb-8 flex w-full max-w-md rounded bg-neutral-600 p-4 shadow-xl">
            <input
              ref={inputRef}
              className="w-full bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
              disabled={isLoading}
              placeholder={isLoading ? "Loading..." : "What you want to know?"}
              value={input}
              onChange={handleInputChange}
              autoFocus
            />

            {isLoading ? (
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "⏎"
            )}
          </div>
        </form>
      </div>
    </>
  );
};
