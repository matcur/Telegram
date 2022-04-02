import React, {createRef, FC, ReactElement, RefObject, useEffect, useState} from 'react'
import {Chat, Message} from "models";
import {useAppSelector} from "app/hooks";
import {ChatMessage} from "./ChatMessage";
import {nullMessage} from "nullables";
import {sameUsers} from "utils/sameUsers";
import {lastIn} from "utils/lastIn";
import {ChatWebsocket} from "../../app/chat/ChatWebsocket";
import {inSameDay} from "../../utils/datetime/inSameDay";

type Props = {
  messages: Message[]
  onMessageDoubleClick: (message: Message) => void
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const ChatMessages = ({messages, onMessageDoubleClick}: Props) => {
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