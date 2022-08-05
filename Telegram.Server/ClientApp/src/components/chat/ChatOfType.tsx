import React, {FC, useCallback, useEffect, useRef, useState} from 'react'
import {useAppDispatch, useAppSelector} from "app/hooks";
import {Chat as ChatModel, Message} from "models";
import {useFormInput} from "hooks/useFormInput";
import {textContent} from "utils/textContent";
import {NewMessageState} from "app/messageStates/NewMessageState";
import {MessageState} from "app/messageStates/MessageState";
import {EditingMessageState} from "app/messageStates/EditingMessageState";
import {ChatApi} from "api/ChatApi";
import {addChatMembers, addPreviousMessages, chatMessages, updateMessage} from "app/slices/authorizationSlice";
import {MessagesApi} from "../../api/MessagesApi";
import {sameUsers} from "../../utils/sameUsers";
import {IChatWebsocket} from "../../app/chat/ChatWebsocket";
import {useArbitraryElement} from "../../hooks/useArbitraryElement";
import {ArbitraryElement} from "../up-layer/ArbitraryElement";
import {MessageOptions} from "../message/MessageOptions";
import {PublicChat} from "../chats/PublicChat";
import {Pagination} from "../../utils/type";
import {useFlag} from "../../hooks/useFlag";

type Props = {
  chat: ChatModel
  websocket: IChatWebsocket
  onMessageSearchClick(): void
}

const messagePerPage = 30;

export type ChatProps = {
  websocket: IChatWebsocket
  chat: ChatModel
  loaded: boolean
  messages: Message[]
  textInput: { onChange: (e: (React.FormEvent<HTMLInputElement> | string)) => void; value: string }
  onMessageInput: () => void
  id: number
  reply: Message | undefined
  loadPreviousMessages(): Promise<void>
  onMessageSearchClick(): void
  tryEditMessage(message: Message): void
  onMessageRightClick(message: Message, e: React.MouseEvent<HTMLDivElement>): void
  replyTo(message: Message): void
  onRemoveReplyClick(): void
  onSubmit(message: Partial<Message>): void
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
  const [allMessagesLoaded, markAllMessagesLoaded, unmarkAllMessagesLoaded] = useFlag(false)
  const loadingMessagesPromise = useRef<Promise<void> | null>(null)
  const loadPreviousMessages = useCallback(() => {
    if (allMessagesLoaded) {
      return Promise.resolve();
    }
    if (loadingMessagesPromise.current) {
      return loadingMessagesPromise.current;
    }
    const promise = new Promise<void>((res, rej) => {
      new ChatApi(id, authorizeToken)
        .messages(messages.length, 30)
        .then(messages => {
          if (!messages.length) {
            return markAllMessagesLoaded()
          }
          dispatch(addPreviousMessages({
            messages,
            chatId: id
          }))
          res()
          loadingMessagesPromise.current = null
        }).catch(rej)
    })
    loadingMessagesPromise.current = promise

    return promise
  }, [allMessagesLoaded, chat, messages.length])

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
  const loadMembers = useCallback(async (chatId: number, pagination: Pagination) => {
    const members = await new ChatApi(chatId, authorizeToken)
      .members(pagination)

    dispatch(addChatMembers({chatId, members}))
  }, [authorizeToken])

  useEffect(function onChatChange() {
    setLoaded(false)
    unmarkAllMessagesLoaded()
  }, [chat])

  useEffect(() => {
    if (messages.length > messagePerPage || allMessagesLoaded) {
      setLoaded(true)
      return
    }

    loadPreviousMessages()
      .then(() => setLoaded(true))
  }, [chat])

  useEffect(() => {
    setInputState(newMessageState())
    loadingMessagesPromise.current = null
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
    allMessagesLoaded,
  }

  return (
    <PublicChat
      {...props}
      loadMembers={loadMembers}
    />
  )
}
