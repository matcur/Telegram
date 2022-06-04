import React, {ReactElement} from 'react'
import {Message} from "models";
import {ChatMessage} from "./ChatMessage";
import {nullMessage} from "nullables";
import {inSameDay} from "../../utils/datetime/inSameDay";
import {Position} from "../../utils/type";

type Props = {
  messages: Message[]
  onMessageDoubleClick: (message: Message) => void
  onMessageRightClick: (message: ReactElement) => void
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const ChatMessages = ({messages, onMessageDoubleClick, onMessageRightClick}: Props) => {
  const makeMessages = (messages: Message[]) => {
    const result: ReactElement[] = [];
    let key = 0;
    messages.forEach((current, i) => {
      const previous = i === 0? nullMessage: messages[i - 1]
      const next = i + 1 === messages.length? nullMessage: messages[i + 1]
      const sameDay = inSameDay(new Date(current.creationDate), new Date(next.creationDate))
      const showDate = !sameDay && next !== nullMessage
      const nextDate = new Date(next.creationDate)
      result.push(<ChatMessage
          key={key++}
          onDoubleClick={onMessageDoubleClick}
          previousAuthor={previous.author}
          message={current}
          nextAuthor={next.author}
          onRightClick={onMessageRightClick}
      />)
      if (showDate) {
        result.push(<div key={key++} className="date-delimiter">
          <div className="date-value">{`${months[nextDate.getMonth()]} ${nextDate.getDate()}`}</div>
        </div>)
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