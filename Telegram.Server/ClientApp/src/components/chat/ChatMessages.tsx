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
  loadPreviousMessages: () => void
  websocket: ChatWebsocket
  chat: Chat
  chatLoaded: boolean
}

const bus = {scrollBarRef: {current: null}} as {scrollBarRef: RefObject<HTMLDivElement>}

const loadPreviousMessageOffset = 15
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const ChatMessages: FC<Props> = ({chatLoaded, chat, websocket, messages, onMessageDoubleClick, loadPreviousMessages}: Props) => {
  const scrollBarRef = createRef<HTMLDivElement>()
  const [lastScrollTops, setLastScrollTops] = useState<Record<number, number>>(() => ({}))
  bus.scrollBarRef = scrollBarRef

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
  const scrollTo = (top: number) => {
    const scroll = bus.scrollBarRef.current!
    scroll.scrollTo({top: top})
  }
  const scrollToBottom = () => {
    const scrollBar = bus.scrollBarRef.current!
    scrollTo(scrollBar.scrollHeight)
  }
  const onScroll = () => {
    const scroll = bus.scrollBarRef.current
    if (!scroll) {
      return
    }

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