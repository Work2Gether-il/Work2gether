import Room from "./room";
import { Box } from "@mui/material";
import { createClient } from '@/utils/supabase/client';
import { ChatMessage } from "@/hooks/useChat";

export default async function RoomPage({
  params,
}: {
  params: { inviteCode: string }
}) {
  const supabase = createClient();
  const { inviteCode } = await params;

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
   
  const { data: messageData, error: messageError } = await supabase
    .from('ChatMessages')
    .select('id, participant_id, content, created_at')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(50);
  
  let messages: ChatMessage[] = [];
  if (messageError) {
    console.error('Error fetching messages:', messageError)
  } else {
    messages = messageData.map(msg => ({
      id: msg.id,
      content: msg.content,
      participantId: msg.participant_id,
      user_name: msg.participant_id,
      createdAt: msg.created_at
    }))
  }

  return <Room sessionId={sessionId} participantId={participantId} messages={messages} />;
}