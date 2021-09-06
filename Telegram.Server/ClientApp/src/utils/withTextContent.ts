import {Message} from "models";
import {removeFrom} from "utils/removeFrom";

export const withTextContent = (message: Message, value: string) => {
  const content = message.content.find(m => m.type === 'Text')
  if (content === undefined) {
    return message
  }

  // remove text content from message content
  const contentCopy = [...message.content]
  removeFrom(contentCopy, content)

  return {...message, content: [...contentCopy, {type: 'Text', value}]} as Message
}