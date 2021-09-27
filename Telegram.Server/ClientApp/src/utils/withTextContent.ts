import {Message} from "models";
import {removeFrom} from "utils/removeFrom";

export const withTextContent = (message: Message, value: string) => {
  const textContent = message.content.find(m => m.type === 'Text')
  if (textContent === undefined) {
    return message
  }

  const content = [...message.content]
  removeFrom(content, textContent)

  return {...message, content: [...content, {type: 'Text', value}]} as Message
}