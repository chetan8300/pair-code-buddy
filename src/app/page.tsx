import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { TagList } from "@/components/tags-list";

import Link from "next/link";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "@/services/rooms";
// import { useRouter } from "next/navigation";

function RoomCard({ room }: { room: Room }) {
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

export default async function Home() {
  // const router = useRouter();
  const rooms = await getRooms();

  return (
    <main className="min-h-screen p-12">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">Find Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
