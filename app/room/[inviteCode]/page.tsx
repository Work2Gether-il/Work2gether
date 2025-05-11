import Room from "./room";
import { Box } from "@mui/material";
import { createClient } from '@/utils/supabase/client';

export default async function RoomPage({
  params,
}: {
  params: { inviteCode: string }
}) {
  const supabase = createClient();
  const { inviteCode } = params;

  console.log('Invite code:', inviteCode);

  // Récupérer session_id et participant_id depuis la table SessionJoinToken
  const { data, error } = await supabase
    .from('SessionJoinToken')
    .select('session_id, user_id')
    .eq('token', inviteCode)
    .single();

  if (error || !data) {
    console.error('Error fetching session data:', error);
    return <Box>Error loading room</Box>;
  }

  const { session_id: sessionId, user_id: participantId } = data;

  return <Room sessionId={sessionId} participantId={participantId} />;
}