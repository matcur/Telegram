import {User} from "../../models";
import React, {useCallback} from "react";
import {MessageInput} from "../message/MessageInput";
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

type Props = ChatProps & {
  loadMembers(groupId: number, pagination: Pagination): void
}

export const PublicChat = ({
 websocket,
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
  const potentialMembers = useAwait(() => new UsersApi().all(), [])
  const authorizeToken = useAppSelector(state => state.authorization.token)

  const addMembers = useCallback((users: User[]) => {
    return users.length && new ChatApi(chat.id, authorizeToken).addMembers(users.map(u => u.id))
  }, [authorizeToken])
  
  return (
    <BaseChat loaded={loaded}>
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
      <ChatHeader onClick={showGroupForm}>
        <ChatDetails
          chat={chat}
          websocket={websocket}
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
        websocket={websocket}
        chat={chat}
        chatLoaded={loaded}>
        <ChatMessages
          onMessageDoubleClick={tryEditMessage}
          messages={messages}
          onMessageRightClick={onMessageRightClick}
          replyTo={replyTo}
          makeMessage={props => <PublicMessageFork {...props}/>}
        />
      </MessageScroll>
      <MessageInput
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
