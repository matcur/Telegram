import React, {createRef, FC, RefObject, useCallback, useEffect, useState} from "react";
import {Chat, Message} from "../../models";
import {IChatWebsocket} from "../../app/chat/ChatWebsocket";

type Props = {
  messages: Message[]
  loadPreviousMessages: () => Promise<void>
  websocket: IChatWebsocket
  chat: Chat
  chatLoaded: boolean
}

const loadPreviousMessageOffset = 45
const bus = {scrollBarRef: {current: null}} as {scrollBarRef: RefObject<HTMLDivElement>}

export const MessageScroll: FC<Props> = ({chatLoaded, chat, websocket, messages, loadPreviousMessages, children}) => {
  const scrollBarRef = createRef<HTMLDivElement>()
  const [lastScrollTops, setLastScrollTops] = useState<Record<number, number>>(() => ({}))
  const [loadingMessages, setLoadingMessages] = useState(false)
  bus.scrollBarRef = scrollBarRef

  const scrollTo = (top: number) => {
    const scroll = bus.scrollBarRef.current!
    scroll.scrollTo({top: top})
  }
  const scrollToBottom = (bottomOffset = 0) => {
    const scrollBar = bus.scrollBarRef.current!
    scrollTo(scrollBar.scrollHeight - bottomOffset)
  }
  const onScroll = useCallback(() => {
    const scroll = bus.scrollBarRef.current
    if (!scroll) {
      return
    }

    const top = scroll.scrollTop
    const bottom = scroll.scrollHeight - top
    setLastScrollTops({
      ...lastScrollTops,
      [chat.id]: top
    })
    if (top < loadPreviousMessageOffset && messages.length && !loadingMessages) {
      setLoadingMessages(true)
      loadPreviousMessages()
        .then(() => {
          setLoadingMessages(false)
          scrollToBottom(bottom)
        })
    }
  }, [scrollBarRef.current])
  const onMessageAdded = useCallback(() => {
    const scroll = bus.scrollBarRef.current!
    const topOffset = scroll.scrollTop
    const scrollHeight = scroll.scrollHeight
    const lastMessageHeight = scroll.lastElementChild?.clientHeight ?? 0
    const diff = scrollHeight - topOffset - scroll.clientHeight
    if (diff < (lastMessageHeight + 40)) {
      scrollToBottom()
    }
  }, [])

  useEffect(() => {
    websocket.onMessageAdded(onMessageAdded)
    return () => websocket.removeMessageAdded(onMessageAdded)
  }, [websocket])

  useEffect(() => {
    if (!chatLoaded) {
      return
    }

    const lastTopOffset = lastScrollTops[chat.id]
    if (lastTopOffset >= 0) {
      scrollTo(lastTopOffset)
    } else {
      scrollToBottom()
    }
  }, [chat, chatLoaded])

  return (
    <div
      ref={scrollBarRef}
      className="scrollbar chat-messages"
      onScroll={onScroll}>
      {children}
    </div>
  )
}