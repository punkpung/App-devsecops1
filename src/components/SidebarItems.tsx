"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { MoreHorizontal, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { Room } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { deleteRoomById } from "@/actions/room";

interface SidebarItems {
  rooms: Room[];
}

export const SidebarItems = ({ rooms }: SidebarItems) => {
  const [isOpened, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { pending } = useFormStatus();

  const router = useRouter();

  return (
    <Dialog open={isOpened} onOpenChange={setOpenModal}>
      <div className="flex flex-col space-y-2">
        {rooms.map((room) => (
          <SidebarLink
            key={room.publicId}
            room={room}
            selectRoom={setSelectedRoom}
          />
        ))}
      </div>
      <DialogContent className="sm:max-w-[500px]">
        <form
          action={async () => {
            if (selectedRoom) {
              await deleteRoomById(selectedRoom.publicId);
            }
            router.refresh();
            setOpenModal(false);
            window.location.reload();
            router.replace("/");
          }}
        >
          <DialogHeader>
            <DialogTitle className={"font-kanit font-medium"}>
              You&#39;re about to delete a chat : {selectedRoom?.name}
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to delete this
              chat?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className={"mt-4"}>
            <Button variant={"destructive"} disabled={pending} type="submit">
              {pending ? (
                <>
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-[3px] border-white"></div>
                  <span className={"font-kanit ml-2"}>Deleting</span>
                </>
              ) : (
                "Delete chat"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const SidebarLink = ({
  room,
  selectRoom,
}: {
  room: Room;
  selectRoom: (room: Room) => void;
}) => {
  const fullPathname = usePathname();

  const active = fullPathname === `/c/${room.publicId}`;

  return (
    <Link
      href={`/c/${room.publicId}`}
      className={cn(
        "hover:text-primary text-muted-foreground group inline-block w-full rounded-md p-2 text-xs transition-colors hover:shadow",
        {
          "text-primary bg-popover/80 font-semibold": active,
          "hover:bg-popover/50": !active,
        },
      )}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "bg-primary absolute left-0 h-6 w-[4px] rounded-r-lg opacity-0",
            active ? "opacity-100" : "",
          )}
        />
        <div>{room.name}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal
              className={cn("group ml-auto transition-opacity", {
                "opacity-0 group-hover:opacity-100": !active,
              })}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 bg-neutral-700">
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="bg-neutral-700 hover:bg-neutral-600"
                onClick={() => selectRoom(room)}
              >
                <Trash className={"mr-2 h-4 w-4"} color={"red"} />
                <span className={"text-md text-red-500"}>Delete chat</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
};
