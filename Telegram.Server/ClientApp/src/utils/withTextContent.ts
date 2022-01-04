import {Message} from "models";
import {removeFrom} from "utils/removeFrom";

export const withTextContent = (message: Message, value: string) => {
  const textContent = message.contentMessages.find(c => c.content.type === 'Text')
  if (textContent === undefined) {
    return message
  }

  const content = [...message.contentMessages]
  removeFrom(content, textContent)

  return {...message, contentMessages: [...content, {type: 'Text', value}]} as Message
}