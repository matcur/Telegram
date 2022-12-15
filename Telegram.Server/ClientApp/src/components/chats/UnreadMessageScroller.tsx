import React from "react";
import {classNames} from "../../utils/classNames";

export type UnreadMessageScrollerProps = {
  bottom: number
  unreadCount: number
  scrollTo(top: number): void
}

export const UnreadMessageScroller = ({bottom, scrollTo, unreadCount}: UnreadMessageScrollerProps) => {
  return (
    <div className="unread-message-scroller-position">
      <button
        className={classNames("clear-btn unread-message-scroller")}
      >
        <div className="scroller-arrow"/>
        <div className="unread-message-count">{unreadCount}</div>
      </button>
    </div>
  )
}