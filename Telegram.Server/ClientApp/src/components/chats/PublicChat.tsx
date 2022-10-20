import {User} from "../../models";
import React from "react";
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
import {Modal} from "../Modal";
import {PublicMessageFork} from "../chat/PublicMessageFork";
import {ChatProps} from "../chat/ChatOfType";
import {useThemedChatClass} from "../../hooks/useThemedChatClass";
import {useModalVisible} from "../../hooks/useModalVisible";
import {UserInfoForm} from "../forms/UserInfoForm";
import {useFunction} from "../../hooks/useFunction";

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
 onMessageAdded,
 onMessageTyping,
}: Props) => {
  const [groupFormVisible, showGroupForm, hideGroupForm] = useFlag(false)
  const [userInfoVisible, userInfoData, showUserInfo, hideUserInfo] = useModalVisible<User>()
  const potentialMembers = useAwait(() => new UsersApi().all(), [])
  const authorizeToken = useAppSelector(state => state.authorization.token)
  const themedClass = useThemedChatClass()

  const addMembers = useFunction((users: User[]) => {
    return users.length && new ChatApi(chat.id, authorizeToken).addMembers(users.map(u => u.id))
  })
  
  return (
    <BaseChat
      loaded={loaded}
    >
      {groupFormVisible && <Modal hide={hideGroupForm} name="PublicChatGroupForm">
        <GroupForm
          onHideClick={hideGroupForm}
          group={chat}
          totalMemberCount={1234}
          loadMembers={loadMembers}
          potentialMembers={potentialMembers}
          addMembers={addMembers}
        />
      </Modal>}
      {userInfoVisible && <Modal hide={hideUserInfo} name="PublicChatGroupForm">
        <UserInfoForm
          hide={hideUserInfo}
          user={userInfoData!}
        />
      </Modal>}
      <ChatHeader onClick={showGroupForm}>
        <ChatDetails
          chat={chat}
          onMessageTyping={onMessageTyping}
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
        messages={messages}
        loadPreviousMessages={loadPreviousMessages}
        onMessageAdded={onMessageAdded}
        chat={chat}
        chatLoaded={loaded}
        className={themedClass}
      >
        <ChatMessages
          onMessageDoubleClick={tryEditMessage}
          messages={messages}
          onMessageRightClick={onMessageRightClick}
          replyTo={replyTo}
          makeMessage={props => <PublicMessageFork {...props}/>}
          onAvatarClick={showUserInfo}
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
