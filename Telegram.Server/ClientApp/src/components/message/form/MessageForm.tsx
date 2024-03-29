import React, {FC, ReactElement, useEffect, useMemo, useRef, useState} from 'react'
import {ReactComponent as PaperClip} from 'public/svgs/paperclip.svg'
import {ReactComponent as Command} from 'public/svgs/command.svg'
import {ReactComponent as Smile} from 'public/svgs/smile.svg'
import {ReactComponent as Microphone} from 'public/svgs/microphone.svg'
import {useForm} from "react-hook-form";
import {useAppSelector} from "../../../app/hooks";
import {FileInput} from "../../form/FileInput";
import {FilesApi} from "../../../api/FilesApi";
import {RichMessageForm} from "../../forms/RichMessageForm";
import {Content, Message, NewMessage} from "../../../models";
import {useFlag} from "../../../hooks/useFlag";
import {Modal} from "../../up-layer/Modal";
import {useFitScrollHeight} from "../../../hooks/useFitScrollHeight";
import {useWindowListener} from "../../../hooks/useWindowListener";
import {useFunction} from "../../../hooks/useFunction";
import {ArbitraryElement} from "../../up-layer/ArbitraryElement";
import {Menu, Option} from "../../lists/Menu";
import {nope} from "../../../utils/functions";
import {useModalVisible} from "../../../hooks/useModalVisible";
import {initUserWebhook} from "../../../app/websockets/userWebsocket";
import {InputEditing} from "../../../app/input/InputEditing";
import {classNames} from "../../../utils/classNames";

type Props = {
  reply?: Message
  replyElement?: ReactElement
  textInput: {value: string, onChange: (e: React.FormEvent<HTMLTextAreaElement> | string) => void}
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

// TODO move to parent and pass chat
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

export const MessageForm: FC<Props> = ({reply, replyElement, onSubmitting, textInput, chatId, onInput}: Props) => {
  const [detailMessageVisible, showDetailMessage, hideDetailMessage] = useFlag(false)
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const {register, handleSubmit} = useForm<Form>()
  const form = useRef<HTMLFormElement>(null)
  const [chatData, setChatData] = useState(chats.item(chatId))
  const [modalData, setModalData] = useState(() => (
    {messageText: "", filePaths: [] as string[]}
  ))
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fitTextScrollHeight = useFitScrollHeight(inputRef)
  const inputOptions = useModalVisible<{position: {left: number, bottom: number}}>()
  const inputEditing = useMemo(() => new InputEditing(inputRef), []);
  
  const showDetailMessageForm = useFunction((messageText: string, filePaths: string[]) => {
    setModalData({messageText: textInput.value, filePaths})
    showDetailMessage()
  })
  const hasContent = useFunction(() => {
    return textInput.value.trim() !== "" || chatData.currentMessage.files.length !== 0
  })

  const onDetailSubmit = useFunction((text: string, filePaths: string[]) => {
    const content = filePaths.map(path => ({content: {value: path, type: 'Image'} as Content}))
    if (text) {
      content.push({content: {value: text, type: 'Text'}})
    }
    const message: NewMessage = {
      chatId,
      authorId: currentUser.id,
      replyToId: reply && reply.id,
      contentMessages: [
        ...content
      ]
    }
    setModalData({messageText: "", filePaths: []})
    chatData.currentMessage.text = "";
    onSubmitting(message)

    hideDetailMessage()
  })
  const onSubmit = useFunction(() => {
    if (!hasContent()) {
      return
    }
    onDetailSubmit(textInput.value, chatData.currentMessage.files)
    chatData.currentMessage.text = "";
  })
  
  const loadFiles = useFunction(async (input: HTMLInputElement) => {
    const loadingFiles = input.files
    if (!loadingFiles) {
      return
    }

    const loadedFiles = await new FilesApi().upload("files", loadingFiles)
    showDetailMessageForm(input.value, loadedFiles)
  })
  
  const changeText = useFunction((newValue: string) => {
    newValue = newValue.trimLeft();
    const oldValue = textInput.value
    if (!newValue.trim() && !oldValue.length) {
      return
    }
    textInput.onChange(newValue)
    chats.changeText(newValue, chatId)
  })
  const onTextChange = useFunction((e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    if (value.endsWith("\n")) {
      return
    }
    changeText(value)
  })
  const onEnterPress = useFunction((e: KeyboardEvent) => {
    if (e.ctrlKey) {
      return
    }
    if (e.key === "Enter" && !e.altKey) {
      return onSubmit()
    }
    if (e.key === "Enter" && e.altKey) {
      return changeText(textInput.value + "\n")
    }
  })
  const copy = useFunction(() => inputEditing.copy())
  const selectAll = useFunction(() => {
    inputEditing.selectAll()
  })
  const cut = useFunction(() => {
    changeText(inputEditing.withoutSelected())
  })
  const inputOptionItems = (): Option[] => {
    if (!inputRef.current) {
      return []
    }
    const hasSelection = inputEditing.selection().length > 0
    
    const formatting: Option[] = [
      {content: "Bold", onClick: nope, contentClassName: classNames(!hasSelection && "disabled-menu-option")}
    ]
    
    return [
      {content: "Copy", onClick: copy, contentClassName: classNames(!hasSelection && "disabled-menu-option")},
      {content: "Cut", onClick: cut, contentClassName: classNames(!hasSelection && "disabled-menu-option")},
      {content: "Select All", onClick: selectAll},
      {content: "Formatting", children: formatting},
    ]
  }
  const onInputRightClick = useFunction((e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
    e.preventDefault()
    inputOptions.show({position: {left: e.clientX, bottom: document.body.clientHeight - e.clientY}})
  })
  
  useWindowListener(onEnterPress, "keyup")
  useEffect(() => {
    const chatData = chats.item(chatId)
    
    setChatData(chatData)
    textInput.onChange(chatData.currentMessage.text)
  }, [chatId])
  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef.current])
  useEffect(fitTextScrollHeight, [textInput.value])

  return (
    <form
      className="message-form"
      onSubmit={handleSubmit(onSubmit)}
      ref={form}
    >
      {detailMessageVisible && (
        <Modal hide={hideDetailMessage} name="MessageInputRichMessageForm">
          <RichMessageForm
            filePaths={modalData.filePaths}
            messageText={modalData.messageText}
            onSend={onDetailSubmit}
          />
        </Modal>
      )}
      <ArbitraryElement
        position={inputOptions.data.position}
        visible={inputOptions.visible}
        hide={inputOptions.hide}
      >
        <Menu options={inputOptionItems()} afterClick={inputOptions.hide}/>
      </ArbitraryElement>
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
        <textarea
          className="clear-input message-input"
          placeholder="Write a message..."
          value={textInput.value}
          onChange={onTextChange}
          onInput={onInput}
          onContextMenu={onInputRightClick}
          ref={inputRef}
        />
        <Command/>
        <Smile/>
        <Microphone/>
      </div>
    </form>
  )
}