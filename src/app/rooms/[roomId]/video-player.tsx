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
  CallParticipantsList,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

import { useSession } from 'next-auth/react';
import { Room } from '@/db/schema';
import { generateStreamToken } from './actions';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

export const MyUILayout = ({ onLeave }: { onLeave: () => void }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const { theme } = useTheme();
  console.log("theme", theme);

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme className={theme}>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls
        onLeave={onLeave}
      />
      <CallParticipantsList
        onClose={() => {}}
      />
    </StreamTheme>
  );
}

export const VideoPlayer = ({ room }: { room: Room }) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session.data?.user || !room) {
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_APP_KEY!;
    const user: User = {
      id: session.data.user.id,
      name: session.data.user.name ?? undefined,
      image: session.data.user.image ?? undefined,
    };

    const client = new StreamVideoClient({ apiKey, user, tokenProvider: () => generateStreamToken() });
    setClient(client);
    const call = client.call('default', room.id);
    call.join({ create: true }).catch((err) => {
      console.error(`Failed to join the call`, err);
    });
    setCall(call);

    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(() => {});
    }
  }, []);

  const onLeave = () => {
    router.push('/');
  }

  return (
    client && call ? (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout onLeave={onLeave} />
        </StreamCall>
      </StreamVideo>
    ) : (
      <div>Loading...</div>
    )
  );
};