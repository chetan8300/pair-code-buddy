import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TagList } from "@/components/tags-list";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RoomCard({ room }: { room: Room }) {
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
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
