"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TagList } from "@/components/tags-list";
import { Room } from "@/db/schema";
import { GithubIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteRoomAction } from "@/services/rooms";

export function MyRoomCard({ room }: { room: Room }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {room.githubRepo && (
          <Link href={room.githubRepo} className="flex items-center gap-2">
            <GithubIcon className="h-6 w-6" />
            Github Repo
          </Link>
        )}

        <TagList tags={room.tags} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="flex items-center gap-2">
              <TrashIcon className="h-4 w-4" /> Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure you want to delete?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the room.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  // delete room
                  deleteRoomAction(room.id);

                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>

    </Card>
  );
}
