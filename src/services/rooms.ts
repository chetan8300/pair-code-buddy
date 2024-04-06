import { db } from "@/db";
import { Room } from "@/db/schema";
import { unstable_noStore } from "next/cache";

export async function getRooms() {
  unstable_noStore();

  const rooms = await db?.query.room.findMany();

  return rooms;
}

export async function getRoom(id: string): Promise<Room | undefined> {
  unstable_noStore();
  const room = await db.query.room.findFirst({
    where: (room, { eq }) => eq(room.id, id)
  });

  return room;
}