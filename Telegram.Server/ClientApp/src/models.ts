export type UserChat = Chat & { lastReadMessage?: {messageId: number} };

export type User = {
  id: number
  firstName: string
  lastName: string
  chats: UserChat[]
  avatarUrl: string
  bio: string
  phone?: Phone
  friends?: User[]
  lastActiveTime: string
}

export type Content = {
  type: 'Text' | 'Image'
  value: string
  displayOrder?: number
}

export type Message = {
  id: number
  author: User
  authorId: number
  contentMessages: {content: Content}[]
  chatId: number
  creationDate: string
  type: "UserMessage" | "NewUserAdded"
  replyTo?: Message
  replyToId?: number
  chat?: Chat
  associatedUsers: {user: User}[]
}

export type NewMessage = Pick<
  Message,
  'authorId' |
  'contentMessages' | 
  'chatId' |
  'replyToId'
>

export type Chat = {
  id: number
  name: string
  messages: Message[]
  members: User[]
  updatedDate?: string
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