import {IChatWebsocket} from "../../app/chat/ChatWebsocket";
import {Chat as ChatModel, Message} from "../../models";
import React from "react";
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

type Props = {
  websocket: IChatWebsocket
  chat: ChatModel
  onMessageSearchClick: () => void
  loaded: boolean
  messages: Message[]
  loadPreviousMessages: () => Promise<void>
  tryEditMessage: (message: Message) => void
  onMessageRightClick: (message: Message, e: React.MouseEvent<HTMLDivElement>) => void
  replyTo: (message: Message) => void
  textInput: { onChange: (e: (React.FormEvent<HTMLInputElement> | string)) => void; value: string }
  onMessageInput: () => void
  onSubmit: (message: Partial<Message>) => void
  id: number
  reply: Message | undefined
  onRemoveReplyClick: () => void
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
 textInput
}: Props) => {
  return (
    <BaseChat loaded={loaded}>
      <ChatHeader>
        <ChatDetails
          chat={chat}
          websocket={websocket}
        />
        <div className="chat-actions">
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
