import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat, getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'

import { getModelById } from '@/app/models'

export interface ChatPageProps {
  params: {
    botId: string
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.user) {
    return {}
  }

  const model = await getModelById(params.botId)
  return {
    title: model?.title ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  if (!session?.user) {
    redirect(`/login?next=/bot/${params.botId}/chat/${params.id}`)
  }

  const userId = session.user.id as string
  const chat = await getChat(params.id, userId)

  if (!chat) {
    redirect(`/bot/${params.botId}`)
  }

  if (chat?.userId !== session?.user?.id) {
    notFound()
  }

  const model = await getModelById(params.botId)
  if( !model ) {
    notFound();
  }

  return (
    <AI initialAIState={{ chatId: chat.id, model: model, messages: chat.messages }}>
      <Chat
        id={chat.id}
        model={model}
        session={session}
        initialMessages={chat.messages}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
