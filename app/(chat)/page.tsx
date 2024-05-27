import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'

import { getDefaultModel } from '../models'

export const metadata = {
  title: 'Chatbot ToolBox'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  const defaultModel = await getDefaultModel()

  return (
    <AI initialAIState={{ chatId: id, model:defaultModel, messages: [] }}>
      <Chat id={id} model={defaultModel} session={session} missingKeys={missingKeys} />
    </AI>
  )
}
