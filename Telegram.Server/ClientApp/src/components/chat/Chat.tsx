import React, {FC, useCallback, useEffect, useState} from 'react'
import {MessageInput} from "components/message/MessageInput";
import {ChatMessages} from "components/chat/ChatMessages";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {Chat as ChatModel, Message} from "models";
import {LoadingChat} from "./LoadingChat";
import {ChatHeader} from "components/chat/ChatHeader";
import {useFormInput} from "hooks/useFormInput";
import {textContent} from "utils/textContent";
import {NewMessageState} from "app/messageStates/NewMessageState";
import {MessageState} from "app/messageStates/MessageState";
import {EditingMessageState} from "app/messageStates/EditingMessageState";
import {ChatApi} from "api/ChatApi";
import {addPreviousMessages, chatMessages, updateMessage} from "app/slices/authorizationSlice";
import {MessagesApi} from "../../api/MessagesApi";
import {sameUsers} from "../../utils/sameUsers";
import {ChatWebsocket} from "../../app/chat/ChatWebsocket";
import {MessageScroll} from "./MessageScroll";
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
  
  const onSubmit = useCallback((message: Partial<Message>) => {
    inputState.save(message)
    setInputState(newMessageState())
    input.onChange('')
    setReply(undefined)
  }, [input, inputState])
  const tryEditMessage = useCallback((message: Message) => {
    if (!sameUsers(message.author, currentUser)) {
      return
    }

    editMessage(message)
  }, [currentUser])
  const onMessageRightClick = useCallback((message: Message, e: React.MouseEvent<HTMLDivElement>) => {
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
  }, [])
  const editMessage = useCallback((message: Message) => {
    input.onChange(textContent(message))
    setInputState(new EditingMessageState(
      message, setInputState, dispatch, newMessageState(), new MessagesApi(authorizeToken)
    ))
  }, [input, authorizeToken])
  const replyTo = useCallback((message: Message) => {
    setReply(message)
  }, [])
  const onMessageUpdated = useCallback((message: Message) => {
    dispatch(updateMessage(message))
  }, [])
  const onMessageInput = useCallback(() => {
    websocket.emitMessageTyping()
  }, [websocket])

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
  
  useEffect(function subscribeMessageUpdated() {
    websocket.onMessageUpdated(onMessageUpdated)
    return () => websocket.removeMessageUpdated(onMessageUpdated)
  }, [chat])

  return (
    <div className="chat">
      <ChatHeader
        websocket={websocket}
        chat={chat}
        onSearchClick={onMessageSearchClick}
      />
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
            onInput={onMessageInput}
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
