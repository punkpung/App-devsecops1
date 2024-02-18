import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/components/Sidebar";

import "highlight.js/styles/hybrid.css";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto py-8">{children}</main>
      </div>
      <Toaster richColors />
    </>
  );
}
