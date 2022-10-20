import React, {FC, ReactElement} from 'react'
import {Message, User} from "models";
import {inRowPositionClass} from "utils/inRowPositionClass";
import {useAppSelector} from "app/hooks";
import {classNames} from "../../utils/classNames";
import {useFunction} from "../../hooks/useFunction";

export type ChatMessageProps = {
  key: string | number
  previousAuthor: User
  message: Message
  nextAuthor: User
  onDoubleClick(message: Message): void
  onRightClick(message: Message, event: React.MouseEvent<HTMLDivElement>): void
}

export const ChatMessage: FC<ChatMessageProps> & {AuthorAvatar?: ReactElement} = ({previousAuthor, message, nextAuthor, onDoubleClick, onRightClick, children}) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const currentAuthor = message.author
  const inRowPosition = inRowPositionClass(previousAuthor, message.author, nextAuthor)
  const isCurrentUser = currentUser.id === currentAuthor.id;

  const onContextMenu = useFunction((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    onRightClick(message, e)
  })

  return (
    <div
      onDoubleClick={() => onDoubleClick(message)}
      onContextMenu={onContextMenu}
      className={classNames(
        "message",
        inRowPosition,
        {'current-user-message': isCurrentUser}
      )}>
      {children}
    </div>
  )
}