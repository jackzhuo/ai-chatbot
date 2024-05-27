'use client'

import * as React from 'react'

import { usePathname } from 'next/navigation'

import { type Model } from '@/lib/types'

import { IconLogoOpenAI, IconBotFinancial, IconBotGift } from '@/components/ui/icons'

interface ModelItemProps {
  model: Model
  onSelectChatbot: (botId: string) => void
}

export function ModelItem({ model, onSelectChatbot}: ModelItemProps) {
  // const pathname = usePathname()

  // const [newChatId, setNewChatId] = useLocalStorage('newChatId', null)
  // const shouldAnimate = index === 0 && isActive && newChatId

  const icon = (model.icon == 'IconBotFinancial' ? <IconBotFinancial /> : (model.icon == 'IconBotGift' ? <IconBotGift /> : <IconLogoOpenAI />));

  return (
    <div key={model.id} className="m-2 flex cursor-pointer items-center rounded-lg border bg-white px-4 py-2 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900" 
      onClick={ () => { onSelectChatbot(model.id) }} 
    >  
      <span className="shrink-0">{icon}</span>
      { model.desc == '' ? (
        <div className="pl-2 align-middle text-sm">{model.title}</div>
      ) : (
        <div className="pl-2">
          <div className="text-sm font-semibold">{model.title}</div>
          <p className="py-2 text-xs text-zinc-600">{model.desc}</p>
        </div>
      )}
    </div>
  )
}
