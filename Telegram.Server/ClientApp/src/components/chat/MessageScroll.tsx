import React, {FC, useEffect, useRef, useState} from "react";
import {Chat, Message} from "../../models";
import {classNames} from "../../utils/classNames";
import {useFunction} from "../../hooks/useFunction";
import {onMessageAdded} from "../../app/websockets/chatWebsocket";
import {UnreadMessageScroller, UnreadMessageScrollerProps} from "../chats/UnreadMessageScroller";

type Props = {
  messages: Message[]
  loadPreviousMessages: () => Promise<void>
  chat: Chat
  chatLoaded: boolean
  scrollBarRef: React.RefObject<HTMLDivElement>
  className?: string
  onScroll(top: number): void
  unreadMessageCount: number
}

const loadPreviousMessageOffset = 45

export const MessageScroll: FC<Props> = ({scrollBarRef, chatLoaded, chat, messages, loadPreviousMessages, children, className, unreadMessageCount, onScroll}) => {
  const [lastScrollTops, setLastScrollTops] = useState<Record<number, number>>(() => ({}))
  const scrollHeight = scrollBarRef?.current?.scrollHeight ?? 0
  const scrollTop = scrollBarRef?.current?.scrollTop ?? 0
  const bottom = scrollHeight - scrollTop ?? 0

  const scrollTo = useFunction((top: number) => {
    const scroll = scrollBarRef.current!
    scroll.scrollTo({top: top})
  })
  const scrollToBottom = useFunction((bottomOffset = 0) => {
    const scrollBar = scrollBarRef.current!
    scrollTo(scrollBar.scrollHeight - bottomOffset)
  })
  const onScrollInternal = useFunction(() => {
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
    onScroll(top)
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
      onScroll={onScrollInternal}
    >
      {children}
      <UnreadMessageScroller
        scrollTo={scrollTo}
        bottom={bottom}
        unreadCount={unreadMessageCount}
      />
    </div>
  )
}