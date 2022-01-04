import {Content, Message} from "models";

export const textContent = (message: Message | Content[]) => {
  let content: Content[]
  if (Array.isArray(message)) {
    content = message
  } else {
    content = message.contentMessages.map(c => c.content)
  }

  return content.find(m => m.type === 'Text')?.value ?? ''
}