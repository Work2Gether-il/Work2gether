import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface UseRealtimeChatProps {
  sessionId: string
  participantId: string
}

export interface ChatMessage {
  id?: string
  content: string
  user: {
    name: string
    avatar: string
  }
  createdAt: string
}

const EVENT_MESSAGE_TYPE = 'message'

export function useChat({sessionId, participantId} : UseRealtimeChatProps) {
  const supabase = createClient()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [channel, setChannel] = useState<ReturnType<typeof supabase.channel> | null>(null)
  const [isConnected, setIsConnected] = useState(false)


  useEffect(() => {
    const newChannel = supabase.channel(sessionId)

    newChannel
      .on('broadcast', { event: EVENT_MESSAGE_TYPE }, (payload) => {
        setMessages((current) => [...current, payload.payload as ChatMessage])
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true)
        }
      })

    setChannel(newChannel)

    return () => {
      supabase.removeChannel(newChannel)
    }
  }, [sessionId, participantId, supabase])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!channel || !isConnected) return

      const message: ChatMessage = {
        id: Math.random().toString(36).substring(2, 15),
        content,
        user: {
          name: participantId,
          avatar: "https://www.freeiconspng.com/uploads/clipart--person-icon--cliparts-15.png",
        },
        createdAt: new Date().toISOString(),
      }

      // Update local state immediately for the sender
      setMessages((current) => [...current, message])

      await channel.send({
        type: 'broadcast',
        event: EVENT_MESSAGE_TYPE,
        payload: message,
      })
    },
    [channel, isConnected, participantId]
  )

  return { messages, sendMessage, isConnected }
}