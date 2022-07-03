import React, {createRef, FC, ReactElement, useCallback, useEffect, useState} from 'react'
import {ReactComponent as PaperClip} from 'public/svgs/paperclip.svg'
import {ReactComponent as Command} from 'public/svgs/command.svg'
import {ReactComponent as Smile} from 'public/svgs/smile.svg'
import {ReactComponent as Microphone} from 'public/svgs/microphone.svg'
import {useForm} from "react-hook-form";
import {useAppSelector} from "../../app/hooks";
import {FileInput} from "../form/FileInput";
import {FilesApi} from "../../api/FilesApi";
import {RichMessageForm} from "../forms/RichMessageForm";
import {useCentralPosition} from "../../hooks/useCentralPosition";
import {Content, Message, NewMessage} from "../../models";

type Props = {
  reply?: Message
  replyElement?: ReactElement
  textInput: {value: string, onChange: (e: React.FormEvent<HTMLInputElement> | string) => void}
  chatId: number
  onSubmitting(message: Partial<Message>): void
  onInput(): void
}

type Form = {
  files: FileList
}

type ChatData = {
  id: number
  currentMessage: {text: string, files: string[]}
}

const chats = {
  items: [] as ChatData[],
  item(id: number) {
    if (!this.exists(id)) {
      this.add(id)
    }
    
    return this.items.find(i => i.id === id) as ChatData
  },
  exists(id: number) {
    return this.items.find(i => i.id === id) !== undefined
  },
  add(id: number) {
    this.items.push({id, currentMessage: {text: '', files: []}})
  },
  changeText(text: string, id: number) {
    const chat = this.items.find(i => i.id === id)
    if (chat !== undefined) {
      chat.currentMessage.text = text
    }
  },
  addFile(path: string, id: number) {
    const chat = this.items.find(i => i.id === id)
    if (chat !== undefined) {
      chat.currentMessage.files.push(path)
    }
  }
}

export const MessageInput: FC<Props> = ({reply, replyElement, onSubmitting, textInput, chatId, onInput}: Props) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const {register, handleSubmit} = useForm<Form>()
  const form = createRef<HTMLFormElement>()
  const [chatData, setChatData] = useState(chats.item(chatId))
  const centralPosition = useCentralPosition();
  
  const showDetailMessageForm = useCallback((messageText: string, filePaths: string[]) => {
    centralPosition.show(
      <RichMessageForm
        filePaths={filePaths}
        messageText={textInput.value}
        onSend={onDetailSubmit}
      />
    )
  }, [textInput])
  const hasContent = useCallback(() => {
    return textInput.value !== "" || chatData.currentMessage.files.length !== 0
  }, [textInput, chatData])
  // TODO think something
  const onSubmit = useCallback(() => {
    if (!hasContent()) {
      return
    }
    onDetailSubmit(textInput.value, chatData.currentMessage.files)
    chatData.currentMessage.text = "";
  }, [textInput, chatData])

  const onDetailSubmit = useCallback((text: string, filePaths: string[]) => {
    const message: NewMessage = {
      chatId,
      authorId: currentUser.id,
      replyToId: reply && reply.id,
      contentMessages: [
        {content: {
          value: text,
          type: 'Text',
        }}, ...filePaths.map(path => ({content: {value: path, type: 'Image'} as Content}))
      ]
    }
    onSubmitting(message)

    centralPosition.hide()
    chatData.currentMessage.text = "";
  }, [chatData, reply])
  
  const loadFiles = useCallback(async (input: HTMLInputElement) => {
    const loadingFiles = input.files
    if (loadingFiles == null) {
      return
    }

    const loadedFiles = await new FilesApi().upload("files", loadingFiles)
    showDetailMessageForm(input.value, loadedFiles)
  }, [])
  
  const onTextChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    textInput.onChange(e)
    chats.changeText(e.currentTarget.value, chatId)
  }, [textInput, chats])
  
  useEffect(() => {
    const chatData = chats.item(chatId)
    
    setChatData(chatData)
    textInput.onChange(chatData.currentMessage.text)
  }, [chatId, textInput])

  return (
    <form
      className="message-form"
      onSubmit={handleSubmit(onSubmit)}
      ref={form}>
      <div className="message-form__reply">
        {replyElement}
      </div>
      <div className="message-form__content">
        <FileInput onSelected={loadFiles}>
          <PaperClip/>
        </FileInput>
        <input
          type="file"
          hidden={true}
          {...register('files')}/>
        <input
          type="text"
          className="clear-input message-input"
          placeholder="Write a message..."
          value={textInput.value}
          onChange={onTextChange}
          onInput={onInput}
        />
        <Command/>
        <Smile/>
        <Microphone/>
      </div>
    </form>
  )
}