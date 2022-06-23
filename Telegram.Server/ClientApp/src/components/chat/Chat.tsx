import React, {FC, ReactElement, useCallback, useEffect, useState} from 'react'
import {MessageInput} from "components/message/MessageInput";
import {ChatMessages} from "components/chat/ChatMessages";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {Chat as ChatModel, Content, Message} from "models";
import {LoadingChat} from "./LoadingChat";
import {ChatHeader} from "components/chat/ChatHeader";
import {useFormInput} from "hooks/useFormInput";
import {textContent} from "utils/textContent";
import {NewMessageState} from "app/messageStates/NewMessageState";
import {MessageState} from "app/messageStates/MessageState";
import {EditingMessageState} from "app/messageStates/EditingMessageState";
import {ChatApi} from "api/ChatApi";
import {addMessages, chatMessages, addPreviousMessages} from "app/slices/authorizationSlice";
import {MessagesApi} from "../../api/MessagesApi";
import {sameUsers} from "../../utils/sameUsers";
import {debounce} from "../../utils/debounce";
import {ChatWebsocket} from "../../app/chat/ChatWebsocket";
import {MessageScroll} from "./MessageScroll";
import {Position} from "../../utils/type";
import {useArbitraryElement} from "../../hooks/useArbitraryElement";
import {ArbitraryElement} from "../up-layer/ArbitraryElement";
import {MessageReply} from "./MessageReply";
import {MessageOptions} from "../message/MessageOptions";

type Props = {
  chat: ChatModel
  websocket: ChatWebsocket
  onMessageSearchClick(): void
}

export const Chat: FC<Props> = ({chat, websocket, onMessageSearchClick}: Props) => {
  const id = chat.id
  const input = useFormInput()
  const dispatch = useAppDispatch()
  const [loaded, setLoaded] = useState(false)
  const messages = useAppSelector(state => chatMessages(state, id))
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const arbitraryElement = useArbitraryElement()
  const authorizeToken = useAppSelector(state => state.authorization.token)
  const loadPreviousMessages = useCallback(() => (
    (new ChatApi(id, authorizeToken))
      .messages(messages.length, 30)
      .then(messages => dispatch(addPreviousMessages({
        messages,
        chatId: id
      })))
      .then(() => {})
  ), [chat, messages])

  const newMessageState = () => {
    return new NewMessageState(new MessagesApi(authorizeToken))
  }
  const [inputState, setInputState] = useState<MessageState>(newMessageState)
  const [reply, setReply] = useState<Message>()
  
  const onSubmit = (data: FormData) => {
    inputState.save(data)
    setInputState(newMessageState())
    input.onChange('')
    setReply(undefined)
  }
  const tryEditMessage = (message: Message) => {
    if (!sameUsers(message.author, currentUser)) {
      return
    }
    
    editMessage(message)
  }
  const onMessageRightClick = (message: Message, e: React.MouseEvent<HTMLDivElement>) => {
    arbitraryElement.show(
      <ArbitraryElement 
        position={{left: e.clientX, top: e.clientY}}
        onOutsideClick={arbitraryElement.hide}
      >
        <MessageOptions
          message={message}
          onReplyClick={message => {
            arbitraryElement.hide()
            replyTo(message)
          }}
        />
      </ArbitraryElement>
    )
  }
  const editMessage = (message: Message) => {
    input.onChange(textContent(message))
    setInputState(new EditingMessageState(
      message, setInputState, dispatch, newMessageState(), new MessagesApi(authorizeToken)
    ))
  }
  const replyTo = (message: Message) => {
    setReply(message)
  }

  useEffect(() => {
    setLoaded(false)
  }, [chat])

  useEffect(() => {
    if (messages.length) {
      setLoaded(true)
      return
    }

    const load = async () => {
      await loadPreviousMessages()
      setLoaded(true)
    }

    load()
  }, [chat])

  useEffect(() => {
    setInputState(newMessageState())
  }, [chat])

  return (
    <div className="chat">
      <ChatHeader chat={chat} onSearchClick={onMessageSearchClick}/>
      {
        loaded? (<>
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
            textInput={input}
            onSubmitting={onSubmit}
            chatId={id}
            reply={reply}
            replyElement={reply && <MessageReply message={reply} onCloseClick={() => setReply(undefined)}/>}
          />
        </>)
        : <LoadingChat/>
      }
    </div>
  )
}
