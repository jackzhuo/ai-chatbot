'use client'

import * as React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { IconPlus } from '@/components/ui/icons'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { ModelSelectDialog } from './model-select-dialog'

// import {
//   IconLogoOpenAI,
//   IconBotFinancial,
//   IconBotGift
// } from '@/components/ui/icons'
// import { set } from 'date-fns'

// interface ModelItemProps {
//   key?: string
//   model: Model
// }



export function NewChatbotButton(/*{ key, model }: ModelItemProps*/) {
  const [modelDialogOpen, setModelDialogOpen] = React.useState(false)

  const router = useRouter()  
  
  // const icon =
  //   model.icon == 'IconBotFinancial' ? (
  //     <IconBotFinancial />
  //   ) : model.icon == 'IconBotGift' ? (
  //     <IconBotGift />
  //   ) : (
  //     <IconLogoOpenAI />
  //   )

  function onSelectChatbot(botId: string) {
    setModelDialogOpen(false)
    
    router.push(`/bot/${botId}`)
  }

  return (
    <>
      <Link
        href=""
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'h-10 w-full justify-start bg-zinc-50 px-4 my-1 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10'
        )}
        onClick={e => {
          e.preventDefault()

          setModelDialogOpen(true)
        }}
      >
        <IconPlus className="-translate-x-2 stroke-2" />
        New Bot
      </Link>
      <ModelSelectDialog open={modelDialogOpen} onOpenChange={setModelDialogOpen} onSelectChatbot={onSelectChatbot} />
    </>
  )
}
