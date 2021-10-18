import React, {FC, useEffect, useState} from 'react'
import {MessageInput} from "components/message/MessageInput";
import {ChatMessages} from "components/chat/ChatMessages";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {Chat as ChatModel, Content, Message} from "models";
import {LoadingChat} from "./LoadingChat";
import {nullMessage} from "nullables";
import {ChatHeader} from "components/chat/ChatHeader";
import {useFormInput} from "hooks/useFormInput";
import {textContent} from "utils/textContent";
import {NewMessageState} from "app/messageStates/NewMessageState";
import {MessageState} from "app/messageStates/MessageState";
import {EditingMessageState} from "app/messageStates/EditingMessageState";
import {ChatApi} from "api/ChatApi";
import {addMessage, addMessages, chatMessages} from "app/slices/authorizationSlice";
import {useWebhook} from "../../hooks/useWebhook";
import {useArray} from "../../hooks/useArray";

type Props = {
  chat: ChatModel
}

const bus = {currentUserId: -1}

export const Chat: FC<Props> = ({chat}: Props) => {
  const id = chat.id
  const input = useFormInput()
  const loadedChatIds = useArray()
  const dispatch = useAppDispatch()
  const messagesHook = useWebhook('chats')
  const [loaded, setLoaded] = useState(false)
  const messages = useAppSelector(state => chatMessages(state, id))
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const authorizedToken = useAppSelector(state => state.authorization.token)
  bus.currentUserId = currentUser.id

  const emitMessage = (chatId: number, message: string) => {
    messagesHook?.send('EmitMessage', chatId, message)
  }

  const newMessageState = new NewMessageState(dispatch, currentUser, chat.id, emitMessage, authorizedToken)
  const [inputState, setInputState] = useState<MessageState>(newMessageState)

  const onSubmit = (data: FormData, content: Content[]) => {
    inputState.save(data, content)
  }
  const editMessage = (message: Message) => {
    input.onChange(textContent(message))
    setInputState(
      new EditingMessageState(message, setInputState, dispatch, newMessageState)
    )
  }
  
  useEffect(() => {
    messagesHook?.on('ReceiveMessage', (chatId: number, messageJson: string) => {
      const message = JSON.parse(messageJson) as Message

      if (bus.currentUserId === message.author.id) {
        return
      }
      
      if (loadedChatIds.value.includes(chatId)) {
        dispatch(addMessage({chatId, message}))
      }
    })
  }, [messagesHook])
  
  useEffect(() => {
    setInputState(new NewMessageState(
      dispatch, currentUser, chat.id, emitMessage, authorizedToken
    ))
  }, [messagesHook])

  useEffect(() => {
    if (messages.length !== 0) {
      setLoaded(true)
      return
    }

    const load = async () => {
      //Extract chatApi in variable
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
            messages={messages}/>
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