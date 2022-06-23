export type User = {
  id: number
  firstName: string
  lastName: string
  chats: Chat[]
  avatarUrl: string
  phone?: Phone
  friends?: User[]
}

export type Content = {
  type: 'Text' | 'Image'
  value: string
  displayOrder: number
}

export type Message = {
  id: number
  author: User
  contentMessages: {content: Content}[]
  chatId: number
  creationDate: string
  replyTo?: Message
  chat?: Chat
}

export type Chat = {
  id: number
  name: string
  messages: Message[]
  members: User[]
  lastMessage?: Message
  iconUrl?: string
}

export type Phone = {
  ownerId: number
  number: string
}

export type Code = {
  value: string
  userId: number
}