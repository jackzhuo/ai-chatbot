'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { auth } from '@/auth'
import { type Chat } from '@/lib/types'


const defaultModel = {
  id:     "m-gpt-3_5-turbo",
  model:  "gpt-3.5-turbo",
  type:   "model",
  icon:   "IconLogoOpenAI",
  title:  "GPT-3.5-Turbo",
  desc:   "基本GPT-3.5-Turbo完成基本的Chat Completion",
  system: "",
  examples: [],
};


// 模型定义的信息，以后应当修改为从数据库中读取
const models = [{
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
  }, 
    defaultModel, 
  {
    id:     "bot-stock-master",
    model:  "gpt-3.5-turbo",
    type:   "chatbot",
    icon:   "IconBotFinancial",
    title:  "股票分析大师",
    desc:   "为您获取股票的最新价格，分析股票走势，并且在规定的价格买入或卖出指定的股票",
    system: `\
    You are a stock trading conversation bot and you can help users buy stocks, step by step.
    You and the user can discuss stock prices and the user can adjust the amount of stocks they want to buy, or place an order, in the UI.
    
    Messages inside [] means that it's a UI element or a user event. For example:
    - "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
    - "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.
    
    If the user requests purchasing a stock, call \`show_stock_purchase_ui\` to show the purchase UI.
    If the user just wants the price, call \`show_stock_price\` to show the price.
    If you want to show trending stocks, call \`list_stocks\`.
    If you want to show events, call \`get_events\`.
    If the user wants to sell stock, or complete another impossible task, respond that you are a demo and cannot do that.
    
    Besides that, you can also chat with users and do some calculations if needed.`,
    examples: [{
        heading: 'What are the',
        subheading: 'trending memecoins today?',
        message: `What are the trending memecoins today?`
      },{
        heading: 'What is the price of',
        subheading: '$DOGE right now?',
        message: 'What is the price of $DOGE right now?'
      },{
        heading: 'I would like to buy',
        subheading: '42 $DOGE',
        message: `I would like to buy 42 $DOGE`
      },{
        heading: 'What are some',
        subheading: `recent events about $DOGE?`,
        message: `What are some recent events about $DOGE?`
      }],
  }, {
    id:     "bot-math-tutor",
    model:  "m-gpt-4o",
    type:   "chatbot",
    icon:   "IconBotGift",
    title:  "数学导师",
    desc:   "教你学习最基础的数学知识，请尽量使用简短的问题进行提问，我将给出简洁的回答",
    system: "You are a personal math tutor. Answer questions briefly, in a sentence or less.",
    examples: [{
        heading: '请计算',
        subheading: '1 + 1',
        message: "I need to calculate `1 + 1`. Can you help me?"
      },
      {
        heading:    "请计算",
        subheading: "`3x + 11 = 14`",
        message: 'I need to solve the equation ``3x + 11 = 14``. Can you help me?'
      }],
  }
]

// const modelsByType = 
const types = ["model", "chatbot"];
const typeNames = ["Models", "Chatbots"];

export async function getDefaultModel() {
  return defaultModel
}

// 按Id读取模型信息
export async function getModelById(id? : string | null) {
  const model = models.filter(m => m.id === id);
  return model?.length >= 1 ? model[0] : null;
}

export async function getModesByType( type? : string | null) {
  return models.filter( m => m.type === type);
}

// 按类型读取模型列表
export async function getModelData() {
  return types.map( (t, i) => { 
    return {
        type: typeNames[i],
        models: models.filter( m => m.type === t)
    };
  } );
}
