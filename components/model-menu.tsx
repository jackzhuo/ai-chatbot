import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {HamburgerMenuIcon} from '@radix-ui/react-icons'

export interface ModelMenuProps {
  modelId?: string
  setModelId : (value: string) => void
}

export function ModelMenu({ modelId, setModelId }: ModelMenuProps) {  
  const modelsByModel = [{
    id:     "m-gpt-4o",
    model:  "gpt-4o",    // 模型的名称，用于生成模型使用
    type:   "model",     // 模型的类型，分别为：model 和 chatbot 两种
    icon:   "IconLogoOpenAI",
    title:  "GPT-4o",
    desc:   "基本GPT-4o完成基本的Chat Completion",
    system: "",          // 系统prompt
    examples: [],        // Demo问题，最多四个
  }, {
    id:     "m-gpt-4",
    model:  "gpt-4",
    type:   "model",
    icon:   "IconLogoOpenAI",
    title:  "GPT-4",
    desc:   "基本GPT-4完成基本的Chat Completion",
    system: "",
    examples: [],
  }, {
    id:     "m-gpt-3_5-turbo",
    model:  "gpt-3.5-turbo",
    type:   "model",
    icon:   "IconLogoOpenAI",
    title:  "GPT-3.5-Turbo",
    desc:   "基本GPT-3.5-Turbo完成基本的Chat Completion",
    system: "",
    examples: [],
  }]

  const currentModel = modelsByModel.filter(m => m.id == modelId)[0];

  
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            <div className="flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
              <HamburgerMenuIcon />
            </div>
            <span className="ml-2 hidden md:block">{currentModel.title}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-fit">
          { modelsByModel.map(m => (
            <>
            <DropdownMenuItem className="flex-col items-start">
              <div key={m.id} className="my-2 text-sm text-zinc-500" onClick={ () => { setModelId(m.id) }}>{m.title}</div>
            </DropdownMenuItem>
            </>
          ))}
          {/* <DropdownMenuSeparator />
          <form
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <button className=" relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-red-500 hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Sign Out
            </button>
          </form> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
