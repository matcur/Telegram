import React, {ReactElement} from 'react'
import {Message} from "models";
import {ChatMessageProps} from "./ChatMessage";
import {nullMessage} from "nullables";
import {inSameDay} from "../../utils/datetime/inSameDay";
import {MiddleMessage} from "./MiddleMessage";
import {userNames} from "../../utils/userNames";

type Props = {
  messages: Message[]
  onMessageDoubleClick: (message: Message) => void
  onMessageRightClick: (message: Message, event: React.MouseEvent<HTMLDivElement>) => void
  replyTo(message: Message): void
  makeMessage(props: ChatMessageProps): ReactElement
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const ChatMessages = ({messages, onMessageDoubleClick, onMessageRightClick, makeMessage}: Props) => {
  const makeMessages = (messages: Message[]) => {
    const result: ReactElement[] = [];
    messages.forEach((current, i) => {
      const previous = i === 0? nullMessage: messages[i - 1]
      const next = i + 1 === messages.length? nullMessage: messages[i + 1]
      const sameDay = inSameDay(new Date(current.creationDate), new Date(next.creationDate))
      const showDate = !sameDay && next !== nullMessage
      const nextDate = new Date(next.creationDate)
      const type = current.type;
      if (type === "UserMessage") {
        result.push(makeMessage({
          key: current.id,
          onDoubleClick: onMessageDoubleClick,
          previousAuthor: previous.author,
          message: current,
          nextAuthor: next.author,
          onRightClick: onMessageRightClick,
        }))
      }
      if (type === "NewUserAdded") {
        result.push(<MiddleMessage key={current.id}>{userNames(current.associatedUsers)}</MiddleMessage>)
      }
      if (showDate) {
        const date = `${months[nextDate.getMonth()]} ${nextDate.getDate()}`
        result.push(<MiddleMessage key={current.id + "_new_day"}>{date}</MiddleMessage>)
      }
    })

    return result;
  }

  return (
    <>
      {makeMessages(messages)}
    </>
  )
}