import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat, getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'

import { getModelById } from '@/app/models'
import { nanoid } from 'nanoid'

export interface ChatPageProps {
  params: {
    botId: string
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
    redirect(`/login?next=/bot/${params.botId}`)
  }

  const id = nanoid()

  const model = await getModelById(params.botId)
  if( !model ) {
    notFound();
  }

  return (
    <AI initialAIState={{ chatId: id, model: model, messages: [] }}>
      <Chat
        id={id}
        model={model}
        session={session}
        initialMessages={[]}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
