import { db } from "@/db";
import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { unstable_noStore } from "next/cache";

export async function getRooms(searchQuery: string) {
  unstable_noStore();

  const rooms = await db?.query.room.findMany({
    where: (room, { ilike, or }) => {
      if (searchQuery) {
        return or(
          ilike(
            room.name,
            `%${searchQuery}%`
          ),
          ilike(
            room.description,
            `%${searchQuery}%`
            ),
          ilike(
            room.tags,
            `%${searchQuery}%`
          )
        );
      }
    },
  });

  return rooms;
}

export async function getRoom(id: string): Promise<Room | undefined> {
  unstable_noStore();
  const room = await db.query.room.findFirst({
    where: (room, { eq }) => eq(room.id, id)
  });

  return room;
}

export async function getMyRooms(searchQuery: string) {
  unstable_noStore();
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
    return [];
  }

  const rooms = await db?.query.room.findMany({
    where: (room, { ilike, or, and, eq }) => {
      if (searchQuery) {
        return and(
          or(
            ilike(
              room.name,
              `%${searchQuery}%`
            ),
            ilike(
              room.description,
              `%${searchQuery}%`
            ),
            ilike(
              room.tags,
              `%${searchQuery}%`
            )
          ),
          eq(room.userId, session.user.id)
        );
      }
    },
  });

  return rooms;
}