"use server";

import { StreamChat } from "stream-chat";
import { getSession } from "@/lib/auth";

export async function generateStreamToken() {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  // Define values.
  const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
  const api_secret = process.env.GET_STREAM_APP_SECRET!;
  const user_id = session?.user.id

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  // // Create User Token
  const token = serverClient.createToken(user_id);

  return token;
}