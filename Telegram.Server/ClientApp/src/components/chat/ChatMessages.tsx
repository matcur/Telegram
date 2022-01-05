import React, {createRef, FC, useEffect} from 'react'
import {Message} from "models";
import {useAppSelector} from "app/hooks";
import {ChatMessage} from "./ChatMessage";
import {nullMessage} from "nullables";
import {sameUsers} from "utils/sameUsers";
import {lastIn} from "utils/lastIn";

type Props = {
  messages: Message[]
  onMessageDoubleClick: (message: Message) => void
  loadPreviousMessages: () => void
}

export const ChatMessages: FC<Props> = ({messages, onMessageDoubleClick, loadPreviousMessages}: Props) => {
  const scrollBarRef = createRef<HTMLDivElement>()

  const makeMessages = (messages: Message[]) => {
    return messages.map((message, i) => {
      const previous = i === 0? nullMessage: messages[i - 1]
      const next = i + 1 === messages.length? nullMessage: messages[i + 1]

      return <ChatMessage
        onDoubleClick={onMessageDoubleClick}
        key={i}
        previousAuthor={previous.author}
        message={message}
        nextAuthor={next.author}/>
    })
  }
  const onScroll = () => {
    const scrollBar = scrollBarRef.current
    if (scrollBar === null) {
      return
    }

    const top = scrollBar.scrollTop
    if (top < 30) {
      loadPreviousMessages()
    }
  }

  return (
    <div
      ref={scrollBarRef}
      className="chat-messages scrollbar"
      onScroll={onScroll}>
      {makeMessages(messages)}
    </div>
  )
}