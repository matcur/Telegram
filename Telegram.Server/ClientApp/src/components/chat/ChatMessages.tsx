import React, {createRef, FC, RefObject, useEffect, useState} from 'react'
import {Chat, Message} from "models";
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
  chat: Chat
  chatLoaded: boolean
}

const bus = {scrollBarRef: {current: null}} as {scrollBarRef: RefObject<HTMLDivElement>}

const loadPreviousMessageOffset = 15

export const ChatMessages: FC<Props> = ({chatLoaded, chat, websocket, messages, onMessageDoubleClick, loadPreviousMessages}: Props) => {
  const scrollBarRef = createRef<HTMLDivElement>()
  const [lastScrollTops, setLastScrollTops] = useState<Record<number, number>>(() => ({}))
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
  const scrollTo = (top: number) => {
    const scroll = bus.scrollBarRef.current!
    scroll.scrollTo({top: top})
  }
  const scrollToBottom = () => {
    const scrollBar = bus.scrollBarRef.current!
    scrollTo(scrollBar.scrollHeight)
  }
  const onScroll = () => {
    const scroll = bus.scrollBarRef.current!

    const top = scroll.scrollTop
    setLastScrollTops({
      ...lastScrollTops,
      [chat.id]: top
    })
    if (top < loadPreviousMessageOffset && messages.length) {
      loadPreviousMessages()
    }
  }
  const onMessageAdded = () => {
    const scroll = bus.scrollBarRef.current!
    const topOffset = scroll.scrollTop
    const scrollHeight = scroll.scrollHeight
    const lastMessageHeight = scroll.lastElementChild?.clientHeight ?? 0
    const diff = scrollHeight - topOffset - scroll.clientHeight
    if (diff < (lastMessageHeight + 40)) {
      scrollToBottom()
    }
  }

  useEffect(() => {
    websocket.onMessageAdded(onMessageAdded)
    return () => websocket.removeMessageAdded(onMessageAdded)
  }, [websocket])
  
  useEffect(() => {
    if (!chatLoaded) {
      return
    }

    const lastTopOffset = lastScrollTops[chat.id]
    if (lastTopOffset || lastTopOffset === 0) {
      scrollTo(lastTopOffset)
    } else {
      scrollToBottom()
    }
  }, [chat, chatLoaded])

  return (
    <div
      ref={scrollBarRef}
      className="chat-messages scrollbar"
      onScroll={onScroll}>
      {makeMessages(messages)}
    </div>
  )
}