'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
// import { toast } from 'sonner'

// import { ServerActionResult, type Chat } from '@/lib/types'
// import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
// import { IconLogoOpenAI, IconBotFinancial, IconBotGift } from '@/components/ui/icons'
import { ModelItem } from '@/components/model-item'


// interface ChatShareDialogProps extends DialogProps {
//   chat: Pick<Chat, 'id' | 'title' | 'messages'>
//   shareChat: (id: string) => ServerActionResult<Chat>
//   onCopy: () => void
// }
export interface ModelSelectProps extends DialogProps {
  onSelectChatbot: (botId: string) => void
}

export function ModelSelectDialog ({
  onSelectChatbot,
  ...props
} : ModelSelectProps) {
  // const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [isSharePending, startShareTransition] = React.useTransition()

  // 这里尝试过将所有的信息统一放在 `models.ts` 代码中，但是models,tx是Server端对象，不能和这个对象（Client端对象)一起使用
  // 思考了一下，确实是这样，因为在 `models.ts`中的数据是保存在数据库中的，所以在读取时需要通过接口访问才可以获得，这里需要再优化一下
  const models = [{
    id:     "bot-stock-master",
    type:   "chatbot",
    icon:   "IconBotFinancial",
    title:  "股票分析大师",
    desc:   "为您获取股票的最新价格，分析股票走势，并且在规定的价格买入或卖出指定的股票",
  }, {
    id:     "bot-math-tutor",
    type:   "chatbot",
    icon:   "IconBotGift",
    title:  "数学导师",
    desc:   "教你学习最基础的数学知识，请尽量使用简短的问题进行提问，我将给出简洁的回答",
  }]

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>选择模型</DialogTitle>
          <DialogDescription>
            请选择OpenAI模型或聊天机器人.
          </DialogDescription>
        </DialogHeader>

        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <h4 className="text-sm font-medium">Chatbots</h4>
          </div>

          { models.map((m, i) => (
            <ModelItem key={ m.id } model={ m } onSelectChatbot={ onSelectChatbot }/>
          ))}
         </div>
      </DialogContent>
    </Dialog>
  )
}
