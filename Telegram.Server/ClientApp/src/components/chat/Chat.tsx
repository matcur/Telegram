import React, {FC, useCallback, useEffect, useState} from 'react'
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
import {addMessage, addMessages, chatMessages, addPreviousMessages} from "app/slices/authorizationSlice";
import {useWebhook} from "../../hooks/useWebhook";
import {useArray} from "../../hooks/useArray";
import {MessagesApi} from "../../api/MessagesApi";
import {sameUsers} from "../../utils/sameUsers";
import {debounce} from "../../utils/debounce";

type Props = {
  chat: ChatModel
  emitMessage: (message: Message) => void
}

const bus = {currentUserId: -1}

export const Chat: FC<Props> = ({chat, emitMessage}: Props) => {
  const id = chat.id
  const input = useFormInput()
  const loadedChatIds = useArray()
  const dispatch = useAppDispatch()
  const [loaded, setLoaded] = useState(false)
  const messages = useAppSelector(state => chatMessages(state, id))
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const authorizedToken = useAppSelector(state => state.authorization.token)
  bus.currentUserId = currentUser.id
  const loadPreviousMessages = useCallback(debounce(() => {
    (new ChatApi(id, authorizedToken))
      .messages(messages.length, 10)
      .then(res => res.result)
      .then(messages => dispatch(addPreviousMessages({
        messages,
        chatId: id
      })))
  }, 200), [chat, messages])

  const [newMessageState, ] = useState(() => new NewMessageState(
    dispatch, currentUser, id, emitMessage, new MessagesApi(authorizedToken)
  ))
  const [inputState, setInputState] = useState<MessageState>(newMessageState)
  
  const onSubmit = (data: FormData, content: Content[]) => {
    inputState.save(data, content)
  }
  const editMessage = (message: Message) => {
    if (!sameUsers(message.author, currentUser)) {
      return
    }
    
    input.onChange(textContent(message))
    setInputState(new EditingMessageState(
      message, setInputState, dispatch, newMessageState, new MessagesApi(authorizedToken)
    ))
  }

  useEffect(() => {
    if (messages.length !== 0) {
      setLoaded(true)
      return
    }

    const load = async () => {
      const response = await new ChatApi(id, authorizedToken).messages(0, 10)
      const messages = response.result
      
      dispatch(addMessages({chatId: id, messages}))
      setLoaded(true)
    }

    load()
  }, [chat])

  useEffect(() => {
    setInputState(newMessageState)
  }, [chat])

  useEffect(() => {
    loadedChatIds.add(id)
  }, [chat])

  return (
    <div className="chat">
      <ChatHeader chat={chat}/>
      {
        loaded? (<>
          <ChatMessages
            onMessageDoubleClick={editMessage}
            messages={messages}
            loadPreviousMessages={loadPreviousMessages}/>
          <MessageInput
            textInput={input}
            onSubmitting={onSubmit}
            chatId={id}/>
        </>)
        : <LoadingChat/>
      }
    </div>
  )
}
