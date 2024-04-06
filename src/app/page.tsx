import { db } from "@/db";

export default async function Home() {

  const rooms = await db.query.room.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Home Page</h1>

      <div className="flex flex-col gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="flex items-center gap-4">
            <div>{room.name}</div>
            <div>{room.description}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
