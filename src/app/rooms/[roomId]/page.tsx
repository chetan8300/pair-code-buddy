import { getRoom } from "@/services/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { TagList } from "@/components/tags-list";
import { VideoPlayer } from "./video-player";

type RoomPageProps = {
  params: {
    roomId: string;
  };
  searchParams: any;
}

const RoomPage = async (props: RoomPageProps) => {
  const room = await getRoom(props.params.roomId);

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen container">
      <div className="col-span-3 h-full p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <VideoPlayer room={room} />
        </div>
      </div>
      <div className="col-span-1 h-full p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <h1 className="text-base">{room.name}</h1>
          {room.githubRepo && (
            // <div className="flex justify-center mt-4">
              <Link href={room.githubRepo} className="flex items-center gap-2 my-4">
                <GithubIcon className="h-6 w-6" />
                Github Repo
              </Link>
            // </div>
          )}
          <p className="text-sm text-muted-foreground">{room.description}</p>

          <TagList tags={room.tags} />

        </div>
      </div>
    </div>
  );
}

export default RoomPage;