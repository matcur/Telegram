import {User} from "../../models";
import React, {useEffect, useRef, useState} from "react";
import {MessageForm} from "../message/MessageForm";
import {ReactComponent as Magnifier} from "../../public/svgs/magnifier.svg";
import {ReactComponent as Star} from "../../public/svgs/star.svg";
import {ReactComponent as ThreeDot} from "../../public/svgs/three-dots.svg";
import {BaseChat} from "./BaseChat";
import {ChatHeader} from "../chat/ChatHeader";
import {MessageScroll} from "../chat/MessageScroll";
import {ChatMessages} from "../chat/ChatMessages";
import {MessageReply} from "../chat/MessageReply";
import {ChatDetails} from "../chat/ChatDetails";
import {GroupForm} from "../forms/GroupForm";
import {preventClickBubble} from "../../utils/preventClickBubble";
import {Pagination} from "../../utils/type";
import {useAppSelector} from "../../app/hooks";
import {useAwait} from "../../hooks/useAwait";
import {UsersApi} from "../../api/UsersApi";
import {ChatApi} from "../../api/ChatApi";
import {useFlag} from "../../hooks/useFlag";
import {Modal} from "../up-layer/Modal";
import {PublicMessageFork} from "../chat/PublicMessageFork";
import {ChatProps} from "../chat/ChatOfType";
import {useThemedChatClass} from "../../hooks/useThemedChatClass";
import {useModalVisible} from "../../hooks/useModalVisible";
import {UserInfoForm} from "../forms/UserInfoForm";
import {useFunction} from "../../hooks/useFunction";
import {debounce} from "../../utils/debounce";
import {onMessageAdded} from "../../app/websockets/chatWebsocket";
import {lastIn} from "../../utils/lastIn";
import {nullMessage} from "../../nullables";
import {useDispatch} from "react-redux";
import { changeUnreadCount } from "app/slices/authorizationSlice";

type Props = ChatProps & {
  loadMembers(groupId: number, pagination: Pagination): void
}

export const PublicChat = ({
  chat,
  onMessageSearchClick,
  loadPreviousMessages,
  loaded,
  reply,
  messages,
  id,
  onRemoveReplyClick,
  onMessageInput,
  tryEditMessage,
  onMessageRightClick,
  onSubmit,
  replyTo,
  textInput,
  loadMembers,
}: Props) => {
  const [groupFormVisible, showGroupForm, hideGroupForm] = useFlag(false)
  const [userInfoVisible, userInfoData, showUserInfo, hideUserInfo] = useModalVisible<User>()
  const potentialMembers = useAwait(() => new UsersApi().all(), [])
  const authorizeToken = useAppSelector(state => state.authorization.token)
  const themedClass = useThemedChatClass()
  const messageHeights = useRef<Record<number, number>>({})
  const scrollBarRef = useRef<HTMLDivElement>(null)
  const lastReadMessageIdRef = useRef(chat.lastReadMessageId ?? 0)
  const [unreadMessageCount, setUnreadMessageCount] = useState(chat.unreadMessageCount ?? 0)
  const dispatch = useDispatch()

  const addMembers = useFunction((users: User[]) => {
    return users.length && new ChatApi(chat.id, authorizeToken).addMembers(users.map(u => u.id))
  })
  const setMessageHeight = useFunction((messageId: number, height: number) => {
    messageHeights.current[messageId] = height
  })
  const getBottomDisplayingMessageId = useFunction(() => {
    const scrollBar = scrollBarRef.current
    if (!scrollBar) {
      return 0
    }
    
    const ids: number[] = Object.keys(messageHeights.current) as any
    let passHeight = 0
    let messageId = ids[0]
    ids.reverse()
    for (const id of ids) {
      passHeight += messageHeights.current[id]
      messageId = id
      if (passHeight >= scrollBar.scrollHeight - scrollBar.scrollTop - scrollBar.clientHeight) {
        break
      }
    }
    
    return Number(messageId)
  })
  const readMessageCount = useFunction((bottomDisplayingMessageId: number) => {
    let readCount = 0
    if (lastIn(messages, nullMessage).id <= bottomDisplayingMessageId) {
      return Infinity
    }
    for (const {id} of messages) {
      if (id > lastReadMessageIdRef.current && id <= bottomDisplayingMessageId) {
        readCount++
      }
    }
    return readCount;
  })
  const calculateUnreadMessageCount = (bottomDisplayingMessageId: number) => {
    setUnreadMessageCount(state => Math.max(state - readMessageCount(bottomDisplayingMessageId), 0))
  }
  const onScroll = useFunction(debounce(() => {
    const bottomDisplayingMessageId = getBottomDisplayingMessageId()
    if (bottomDisplayingMessageId > lastReadMessageIdRef.current) {
      calculateUnreadMessageCount(bottomDisplayingMessageId)
      lastReadMessageIdRef.current = bottomDisplayingMessageId
    }
  }, 50))
  
  useEffect(() => {
    return onMessageAdded(chat.id, () => {
      if (lastIn(messages, nullMessage).id !== getBottomDisplayingMessageId()) {
        setUnreadMessageCount(state => state + 1)
      }
    })
  }, [messages.length])
  
  useEffect(() => {
    dispatch(changeUnreadCount({chatId: chat.id, unreadCount: unreadMessageCount}))
  }, [unreadMessageCount])
  
  return (
    <BaseChat
      loaded={loaded}
    >
      {groupFormVisible && (
        <Modal hide={hideGroupForm} name="PublicChatGroupForm">
          <GroupForm
            onHideClick={hideGroupForm}
            group={chat}
            totalMemberCount={chat.memberCount}
            loadMembers={loadMembers}
            potentialMembers={potentialMembers}
            addMembers={addMembers}
          />
        </Modal>
      )}
      {userInfoVisible && (
        <Modal hide={hideUserInfo} name="PublicChatUserInfoForm">
          <UserInfoForm
            hide={hideUserInfo}
            user={userInfoData!}
          />
        </Modal>
      )}
      <ChatHeader onClick={showGroupForm}>
        <ChatDetails
          chat={chat}
        />
        <div className="chat-actions" onClick={preventClickBubble}>
          <button className="clear-btn chat-action-btn" onClick={onMessageSearchClick}>
            <Magnifier/>
          </button>
          <button className="clear-btn chat-action-btn">
            <Star/>
          </button>
          <button className="clear-btn chat-action-btn">
            <ThreeDot/>
          </button>
        </div>
      </ChatHeader>
      <MessageScroll
        scrollBarRef={scrollBarRef}
        messages={messages}
        loadPreviousMessages={loadPreviousMessages}
        chat={chat}
        chatLoaded={loaded}
        className={themedClass}
        onScroll={onScroll}
        unreadMessageCount={unreadMessageCount}
      >
        <ChatMessages
          onMessageDoubleClick={tryEditMessage}
          messages={messages}
          onMessageRightClick={onMessageRightClick}
          replyTo={replyTo}
          makeMessage={useFunction(props => <PublicMessageFork {...props}/>)}
          onAvatarClick={showUserInfo}
          onMessageHeightChange={setMessageHeight}
        />
      </MessageScroll>
      <MessageForm
        textInput={textInput}
        onInput={onMessageInput}
        onSubmitting={onSubmit}
        chatId={id}
        reply={reply}
        replyElement={reply &&
        <MessageReply message={reply} onCloseClick={onRemoveReplyClick}/>}
      />
    </BaseChat>
  )
}
