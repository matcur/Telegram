import React, {FC, useEffect, useState} from 'react'
import {MessageInput} from "components/message/MessageInput";
import {ChatMessages} from "components/chat/ChatMessages";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {Chat as ChatModel, Content, Message} from "models";
import {addMessages, chatMessages} from "app/slices/chatsSlice";
import {LoadingChat} from "./LoadingChat";
import {nullMessage} from "nullables";
import {ChatHeader} from "components/chat/ChatHeader";
import {useFormInput} from "hooks/useFormInput";
import {textContent} from "utils/textContent";
import {NewMessageState} from "app/messageStates/NewMessageState";
import {MessageState} from "app/messageStates/MessageState";
import {EditingMessageState} from "app/messageStates/EditingMessageState";

type Props = {
  chat: ChatModel
}

export const Chat: FC<Props> = ({chat}: Props) => {
  const messages = useAppSelector(state => chatMessages(state, chat.id))
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const dispatch = useAppDispatch()
  const input = useFormInput()
  const newMessageState = new NewMessageState(dispatch, chat.id, currentUser)
  const [inputState, setInputState] = useState<MessageState>(newMessageState)
  const [loaded, setLoaded] = useState(false)

  const onSubmit = (data: FormData, content: Content[]) => {
    inputState.submit(data, content)
  }
  const editMessage = (message: Message) => {
    input.onChange(textContent(message))
    setInputState(
      new EditingMessageState(message, setInputState, dispatch, newMessageState)
    )
  }

  useEffect(() => {
    if (messages.length !== 0) {
      setLoaded(true)
      return
    }

    async function load() {
      await setTimeout(() => {
        dispatch(addMessages({chatId: chat.id, messages: [nullMessage, nullMessage]}))
        setLoaded(true)
      }, 1000)
    }

    load()
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
            onSubmitting={onSubmit}/>
        </>)
        : <LoadingChat/>
      }
    </div>
  )
}