import React, {createRef, FC, useContext, useEffect, useState} from 'react'
import {ReactComponent as PaperClip} from 'public/svgs/paperclip.svg'
import {ReactComponent as Command} from 'public/svgs/command.svg'
import {ReactComponent as Smile} from 'public/svgs/smile.svg'
import {ReactComponent as Microphone} from 'public/svgs/microphone.svg'
import {useForm} from "react-hook-form";
import {Content} from "models";
import {useAppSelector} from "../../app/hooks";
import {FileInput} from "../form/FileInput";
import {FilesApi} from "../../api/FilesApi";
import {UpLayerContext} from "../../contexts/UpLayerContext";
import {RichMessageForm} from "../forms/RichMessageForm";

type Props = {
  onSubmitting: (data: FormData, content: Content[]) => void
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
  const upLayer = useContext(UpLayerContext)
  
  const showDetailMessageForm = (messageText: string, filePaths: string[]) => {
    upLayer.setVisible(true)
    upLayer.setCentralElement(
      <RichMessageForm 
        filePaths={filePaths}
        messageText={textInput.value}
        onSend={onDetailSubmit}
      />
    )
  }

  const onSubmit = () => {
    onDetailSubmit(textInput.value, chatData.currentMessage.files)
  }

  const onDetailSubmit = (messageText: string, filePaths: string[]) => {
    const form = new FormData()
    const content: Content[] = []

    seedForm(form, messageText, filePaths)

    onSubmitting(form, content)
    textInput.onChange('')
    
    upLayer.setVisible(false)
    upLayer.setCentralElement(<div/>)
  }

  // Todo: use toFormData function
  const seedForm = (form: FormData, messageText: string, filePaths: string[]) => {
    form.append('chatId', chatId.toString())
    form.append('authorId', currentUser.id.toString())
    form.append('content[0].type', 'Text')
    form.append('content[0].value', messageText)
    
    filePaths.forEach((path, key) => {
      const index = key + 1;
      
      form.append(`content[${index}].type`, 'Image')
      form.append(`content[${index}].value`, path)
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