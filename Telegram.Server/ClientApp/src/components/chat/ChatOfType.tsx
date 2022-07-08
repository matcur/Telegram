import React, {FC, useCallback, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "app/hooks";
import {Chat as ChatModel, Message} from "models";
import {useFormInput} from "hooks/useFormInput";
import {textContent} from "utils/textContent";
import {NewMessageState} from "app/messageStates/NewMessageState";
import {MessageState} from "app/messageStates/MessageState";
import {EditingMessageState} from "app/messageStates/EditingMessageState";
import {ChatApi} from "api/ChatApi";
import {addPreviousMessages, chatMessages, updateMessage} from "app/slices/authorizationSlice";
import {MessagesApi} from "../../api/MessagesApi";
import {sameUsers} from "../../utils/sameUsers";
import {IChatWebsocket} from "../../app/chat/ChatWebsocket";
import {useArbitraryElement} from "../../hooks/useArbitraryElement";
import {ArbitraryElement} from "../up-layer/ArbitraryElement";
import {MessageOptions} from "../message/MessageOptions";
import {PublicChat} from "../chats/PublicChat";

type Props = {
  chat: ChatModel
  websocket: IChatWebsocket
  onMessageSearchClick(): void
}

export const ChatOfType: FC<Props> = ({chat, websocket, onMessageSearchClick}: Props) => {
  const id = chat.id
  const textInput = useFormInput()
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

  const newMessageState = useCallback(() => {
    return new NewMessageState(new MessagesApi(authorizeToken))
  }, [authorizeToken])
  const [inputState, setInputState] = useState<MessageState>(newMessageState)
  const [reply, setReply] = useState<Message>()
  
  const onSubmit = useCallback((message: Partial<Message>) => {
    inputState.save(message)
    setInputState(newMessageState())
    textInput.onChange('')
    setReply(undefined)
  }, [textInput, inputState])
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
    textInput.onChange(textContent(message))
    setInputState(new EditingMessageState(
      message, setInputState, dispatch, newMessageState(), new MessagesApi(authorizeToken)
    ))
  }, [textInput, authorizeToken])
  const replyTo = useCallback((message: Message) => {
    setReply(message)
  }, [])
  const onMessageUpdated = useCallback((message: Message) => {
    dispatch(updateMessage(message))
  }, [])
  const onMessageInput = useCallback(() => {
    websocket.emitMessageTyping()
  }, [websocket])

  const onRemoveReplyClick = useCallback(() => setReply(undefined), [])

  useEffect(() => {
    setLoaded(false)
  }, [chat])

  useEffect(() => {
    if (messages.length) {
      setLoaded(true)
      return
    }

    loadPreviousMessages()
      .then(() => setLoaded(true))
  }, [chat])

  useEffect(() => {
    setInputState(newMessageState())
  }, [chat])
  
  useEffect(function subscribeMessageUpdated() {
    websocket.onMessageUpdated(onMessageUpdated)
    return () => websocket.removeMessageUpdated(onMessageUpdated)
  }, [chat])
  
  const props = {
    websocket,
    chat,
    onMessageSearchClick,
    loaded,
    messages,
    loadPreviousMessages,
    tryEditMessage,
    onMessageRightClick,
    replyTo,
    textInput,
    onMessageInput,
    onSubmit,
    id,
    reply,
    onRemoveReplyClick,
  }
  
  return (
    <PublicChat {...props}/>
  )
}
