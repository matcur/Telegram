import {Content, Message} from "models";

export const imageContent = (message: Message | Content[]) => {
  let content: Content[]
  if (Array.isArray(message)) {
    content = message
  } else {
    content = message.contentMessages.map(c => c.content)
  }

  return content.filter(m => m.type === 'Image')
}