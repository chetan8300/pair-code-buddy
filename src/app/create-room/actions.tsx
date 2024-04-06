'use server';

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();

  // create a new room
  return await db.insert(room).values({
    ...roomData,
    userId: session?.user?.id as string,
  }).execute();
}