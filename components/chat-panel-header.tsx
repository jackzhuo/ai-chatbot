import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconBotFinancial, IconBotGift, IconLogoOpenAI } from '@/components/ui/icons'

import { useAIState } from 'ai/rsc'

import Link from 'next/link'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { Model, Session } from '@/lib/types' 

import { ModelMenu } from './model-menu'
// import { getModesByType } from '@/app/models'

export interface ChatHeaderProps {
  modelId?: string
  setModelId: (value: string)=> void
  session?: Session
  isShared: boolean
}

export function ChatHeader({modelId, setModelId, session, isShared}: ChatHeaderProps) {
  const [aiState] = useAIState()
  console.log(`--- modelId: ${modelId}   AIState ModelId:${aiState.model.id}`);

  const currModel : Model = aiState.model
  const chatHeaderItem = currModel?.type === 'chatbot' ? 
    <Button variant="ghost" className="px-4">
      <div className="flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
        {currModel.icon == 'IconBotFinancial' ? <IconBotFinancial /> : (currModel.icon == 'IconBotGift' ? <IconBotGift /> : <IconLogoOpenAI />)}
      </div>
      <span className="p-2 hidden md:block">{currModel.title}</span>
    </Button>
    // <div className="ml-2 text-sm md:block">{currModel.title}</div> 
    : <ModelMenu modelId={modelId} setModelId={setModelId}/>
  


  return (
    <>
    <div className="sticky top-0 left-0 py-2 w-full z-10 bg-white dark:bg-black">
      <div className="relative items-center mx-auto max-w-2xl px-2">
        {!isShared && !session ? (
        <>
          <div className="group relative m-2 flex items-start md:-ml-12">
            <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm">
              <ExclamationTriangleIcon />
            </div>
            
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
              <p className="text-muted-foreground leading-normal">
                Please{' '}
                <Link href="/login" className="underline">
                  log in
                </Link>{' '}
                or{' '}
                <Link href="/signup" className="underline">
                  sign up
                </Link>{' '}
                to save and revisit your chat history!
              </p>
            </div>
          </div>
        </>
        ) : (
        <>
          {chatHeaderItem}
        </>  
      )}
      </div>
    </div>
    <div className="h-[sticky-height]"></div>
    </>
  )
}
