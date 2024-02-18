import Link from "next/link";
import { Suspense } from "react";
import { SidebarItems } from "@/components/SidebarItems";
import { getRoomEntries } from "@/actions/room";
import { PlusCircle } from "lucide-react";
import { SidebarLoading } from "./SidebarLoading";

export const Sidebar = () => {
  return (
    <aside className="bg-muted border-border hidden h-screen min-w-60 border-r p-4 pt-8 shadow-inner md:block">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-4">
          <Link href={"/"}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibol ml-4 text-lg">New Chat </h3>
              <PlusCircle className="ml-4 h-5 w-5" />
            </div>
          </Link>
          <div className="border-border border-t border-gray-600"></div>
          <Suspense fallback={<SidebarLoading />}>
            <RoomListEntries />
          </Suspense>
        </div>
      </div>
    </aside>
  );
};

const RoomListEntries = async () => {
  let rooms = await getRoomEntries();

  return <>{rooms ? <SidebarItems rooms={rooms} /> : null}</>;
};
