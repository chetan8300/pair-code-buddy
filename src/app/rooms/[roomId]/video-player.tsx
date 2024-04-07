'use client';

import { useEffect, useState } from 'react';
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  useCallStateHooks,
  CallingState,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

import { useSession } from 'next-auth/react';
import { Room } from '@/db/schema';
import { generateStreamToken } from './actions';

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls />
    </StreamTheme>
  );
}

export const VideoPlayer = ({ room }: { room: Room }) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const session = useSession();
  console.log("session", session, room);

  useEffect(() => {
    if (!session.data?.user || !room) {
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_APP_KEY!;
    const user: User = { id: session.data.user.id, name: session.data.user.name ?? "" };

    const client = new StreamVideoClient({ apiKey, user, tokenProvider: () => generateStreamToken() });
    setClient(client);
    const call = client.call('default', room.id);
    call.join({ create: true }).catch((err) => {
      console.error(`Failed to join the call`, err);
    });
    setCall(call);

    return () => {
      call && call.leave();
      client && client.disconnectUser();
    }
  }, [session, room]);

  return (
    client && call ? (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
        </StreamCall>
      </StreamVideo>
    ) : (
      <div>Loading...</div>
    )
  );
};