"use client";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

export function SubbmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={cn(
        "flex items-center justify-center rounded-md px-2 py-1 text-gray-300 hover:bg-neutral-900",
        pending && "opacity-50",
      )}
    >
      <div className="mr-4 text-sm">Create Chat</div>
      <div className="rounded-md bg-[#43393A] px-2 py-1 text-gray-300">⏎</div>
    </button>
  );
}
