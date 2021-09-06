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
  content: Content[]
  chatId: number
  creationDate: string
}

export type Chat = {
  id: number
  name: string
  messages: Message[]
  members: User[]
}

export type Phone = {
  ownerId: number
  number: string
}

export type Code = {
  value: string
  userId: number
}