import React, {FC, useEffect, useRef, useState} from "react";
import {Chat, Message} from "../../models";
import {classNames} from "../../utils/classNames";
import {useFunction} from "../../hooks/useFunction";

type Props = {
  messages: Message[]
  loadPreviousMessages: () => Promise<void>
  chat: Chat
  chatLoaded: boolean
  className?: string
  onMessageAdded(chatId: number, callback: () => void): () => void
}

const loadPreviousMessageOffset = 45

export const MessageScroll: FC<Props> = ({chatLoaded, chat, messages, loadPreviousMessages, children, className, onMessageAdded}) => {
  const scrollBarRef = useRef<HTMLDivElement>(null)
  const [lastScrollTops, setLastScrollTops] = useState<Record<number, number>>(() => ({}))

  const scrollTo = (top: number) => {
    const scroll = scrollBarRef.current!
    scroll.scrollTo({top: top})
  }
  const scrollToBottom = (bottomOffset = 0) => {
    const scrollBar = scrollBarRef.current!
    scrollTo(scrollBar.scrollHeight - bottomOffset)
  }
  const onScroll = useFunction(() => {
    const scroll = scrollBarRef.current
    if (!scroll) {
      return
    }

    const top = scroll.scrollTop
    const bottom = scroll.scrollHeight - top
    setLastScrollTops({
      ...lastScrollTops,
      [chat.id]: top
    })
    if (top < loadPreviousMessageOffset && messages.length) {
      loadPreviousMessages()
        .then(() => scrollToBottom(bottom))
    }
  })
  const onMessageAddedWrap = useFunction(() => {
    const scroll = scrollBarRef.current!
    const topOffset = scroll.scrollTop
    const scrollHeight = scroll.scrollHeight
    const lastMessageHeight = scroll.lastElementChild?.clientHeight ?? 0
    const diff = scrollHeight - topOffset - scroll.clientHeight
    if (diff < (lastMessageHeight + 40)) {
      scrollToBottom()
    }
  })

  useEffect(() => {
    return onMessageAdded(chat.id, onMessageAddedWrap)
  }, [chat.id])

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
      className={classNames("scrollbar chat-messages", className)}
      onScroll={onScroll}>
      {children}
    </div>
  )
}