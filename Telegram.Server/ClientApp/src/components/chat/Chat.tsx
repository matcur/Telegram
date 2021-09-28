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
import {addMessages, chatMessages} from "app/slices/authorizationSlice";

type Props = {
  chat: ChatModel
}

export const Chat: FC<Props> = ({chat}: Props) => {
  const id = chat.id
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const newMessageState = new NewMessageState(dispatch, currentUser, chat.id)
  
  const messages = useAppSelector(state => chatMessages(state, id))
  const input = useFormInput()
  const [inputState, setInputState] = useState<MessageState>(newMessageState)
  const [loaded, setLoaded] = useState(false)

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
    if (messages.length !== 0) {
      setLoaded(true)
      return
    }

    const load = async () => {
      const response = await new ChatApi(id).messages(0, 10)
      const messages = response.result
      
      dispatch(addMessages({chatId: id, messages}))
      setLoaded(true)
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
            onSubmitting={onSubmit}
            chatId={id}/>
        </>)
        : <LoadingChat/>
      }
    </div>
  )
}