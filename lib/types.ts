import { Message } from 'ai'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  type: string
  modelId: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
  modelId: string
}

export interface ModelExample extends Record<string, any> {
  heading: string
  subheading: string
  message: string
}
export interface Model extends Record<string, any> {
  id: string
  model?: string
  type: string
  icon: string
  title: string
  desc: string
  system?: string
  examples?: ModelExample[]
}
