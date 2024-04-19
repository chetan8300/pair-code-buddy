"use server";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getRooms(searchQuery: string) {
  const rooms: Room[] = await db?.query.room.findMany({
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
  const room = await db.query.room.findFirst({
    where: (room, { eq }) => eq(room.id, id)
  });

  return room;
}

export async function getMyRooms(searchQuery: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
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

export async function deleteRoomAction(id: string) {
  const session = await getSession();

  console.log("session", session);

  if (!session) {
    throw new Error("User is not authenticated");
  }

  // did the user create the room?
  const userRoom = await db.query.room.findFirst({
    where: (room, { eq, and }) => and(eq(room.id, id), eq(room.userId, session.user.id))
  });

  console.log("userRoom", userRoom);

  if (!userRoom) {
    throw new Error("Room not found");
  }

  await db.delete(room).where(eq(room.id, id))

  revalidatePath("/my-rooms");
}