import React, {createRef, FC, RefObject, useEffect} from 'react'
import {Message} from "models";
import {useAppSelector} from "app/hooks";
import {ChatMessage} from "./ChatMessage";
import {nullMessage} from "nullables";
import {sameUsers} from "utils/sameUsers";
import {lastIn} from "utils/lastIn";
import {ChatWebsocket} from "../../app/chat/ChatWebsocket";

type Props = {
  messages: Message[]
  onMessageDoubleClick: (message: Message) => void
  loadPreviousMessages: () => void
  websocket: ChatWebsocket
}

const bus = {scrollBarRef: {current: null}} as {scrollBarRef: RefObject<HTMLDivElement>}

export const ChatMessages: FC<Props> = ({websocket, messages, onMessageDoubleClick, loadPreviousMessages}: Props) => {
  const scrollBarRef = createRef<HTMLDivElement>()
  bus.scrollBarRef = scrollBarRef

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
  const scrollToBottom = () => {
    const scrollBar = bus.scrollBarRef.current!
    
    const scrollHeight = scrollBar.scrollHeight
    scrollBar.scrollTo({top: scrollHeight})
  }
  const onScroll = () => {
    const scrollBar = bus.scrollBarRef.current!

    const top = scrollBar.scrollTop
    if (top < 30) {
      loadPreviousMessages()
    }
  }
  const onMessageAdded = () => {
    const scroll = bus.scrollBarRef.current!
    const topOffset = scroll.scrollTop
    const scrollHeight = scroll.scrollHeight
    if (scrollHeight - topOffset < 300) {
      scrollToBottom()
    }
  }

  useEffect(() => {
    websocket.onMessageAdded(onMessageAdded)
    return () => websocket.removeMessageAdded(onMessageAdded)
  }, [websocket])

  return (
    <div
      ref={scrollBarRef}
      className="chat-messages scrollbar"
      onScroll={onScroll}>
      {makeMessages(messages)}
    </div>
  )
}