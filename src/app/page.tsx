import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/services/rooms";
import { SearchBar } from "@/components/search-bar";
import { RoomCard } from "@/components/room-card";

// search paarams
interface HomePageProps {
  searchParams: {
    search?: string;
  };
}

export default async function Home({ searchParams: { search: searchQuery } }: HomePageProps) {
  // const router = useRouter();
  const rooms = await getRooms(searchQuery ?? "");

  return (
    <main className="min-h-screen p-12">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">Find Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <SearchBar />

      <div className="grid grid-cols-3 gap-4 mt-10">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
