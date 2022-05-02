import React, {createRef, FC, useEffect, useState} from 'react'
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

type Props = {
  onSubmitting: (data: FormData) => void
  textInput: {value: string, onChange: (e: React.FormEvent<HTMLInputElement> | string) => void}
  chatId: number
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

export const MessageInput: FC<Props> = ({onSubmitting, textInput, chatId}: Props) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const {register, handleSubmit} = useForm<Form>()
  const form = createRef<HTMLFormElement>()
  const [chatData, setChatData] = useState(chats.item(chatId))
  const centralPosition = useCentralPosition();
  
  const showDetailMessageForm = (messageText: string, filePaths: string[]) => {
    centralPosition.show(
      <RichMessageForm
        filePaths={filePaths}
        messageText={textInput.value}
        onSend={onDetailSubmit}
      />
    )
  }
  const hasContent = () => {
    return textInput.value !== "" || chatData.currentMessage.files.length !== 0
  }
  // TODO think something
  const onSubmit = () => {
    if (!hasContent()) {
      return
    }
    onDetailSubmit(textInput.value, chatData.currentMessage.files)
    chatData.currentMessage.text = "";
  }

  const onDetailSubmit = (messageText: string, filePaths: string[]) => {
    const form = new FormData()

    seedForm(form, messageText, filePaths)
    onSubmitting(form)

    centralPosition.hide()
    chatData.currentMessage.text = "";
  }

  // Todo: use toFormData function
  const seedForm = (form: FormData, messageText: string, filePaths: string[]) => {
    form.append('chatId', chatId.toString())
    form.append('authorId', currentUser.id.toString())
    form.append('contentMessages[0].content.type', 'Text')
    form.append('contentMessages[0].content.value', messageText)
    
    filePaths.forEach((path, key) => {
      const index = key + 1;
      
      form.append(`contentMessages[${index}].content.type`, 'Image')
      form.append(`contentMessages[${index}].content.value`, path)
    })
  }
  
  const loadFiles = async (input: HTMLInputElement) => {
    const loadingFiles = input.files
    if (loadingFiles == null) {
      return
    }
    
    const loadedFiles = await new FilesApi().upload("files", loadingFiles)
    showDetailMessageForm(input.value, loadedFiles.result)
  }
  
  const onTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    textInput.onChange(e)
    chats.changeText(e.currentTarget.value, chatId)
  }
  
  useEffect(() => {
    const chatData = chats.item(chatId)
    
    setChatData(chatData)
    textInput.onChange(chatData.currentMessage.text)
  }, [chatId])

  return (
    <form
      className="message-form"
      onSubmit={handleSubmit(onSubmit)}
      ref={form}>
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
        onChange={onTextChange}/>
      <Command/>
      <Smile/>
      <Microphone/>
    </form>
  )
}