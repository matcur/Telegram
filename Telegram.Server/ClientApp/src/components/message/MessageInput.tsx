import React, {createRef, FC} from 'react'
import {ReactComponent as PaperClip} from 'public/svgs/paperclip.svg'
import {ReactComponent as Command} from 'public/svgs/command.svg'
import {ReactComponent as Smile} from 'public/svgs/smile.svg'
import {ReactComponent as Microphone} from 'public/svgs/microphone.svg'
import {useForm} from "react-hook-form";
import {Content} from "models";
import {useAppSelector} from "../../app/hooks";
import {FileInput} from "../form/FileInput";
import {FilesApi} from "../../api/FilesApi";

type Props = {
  onSubmitting: (data: FormData, content: Content[]) => void
  textInput: {value: string, onChange: (e: React.FormEvent<HTMLInputElement> | string) => void}
  chatId: number
}

type Form = {
  files: FileList
}

export const MessageInput: FC<Props> = ({onSubmitting, textInput, chatId}: Props) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const {register, handleSubmit} = useForm<Form>()
  const form = createRef<HTMLFormElement>()

  const onSubmit = () => {
    const form = new FormData()
    const content: Content[] = []

    seedForm(form, content);

    onSubmitting(form, content)
    textInput.onChange('')
  }

  // Todo: use toFormData function
  const seedForm = (form: FormData, content: Content[]) => {
    form.append('chatId', chatId.toString())
    form.append('authorId', currentUser.id.toString())
    form.append('content[0].type', 'Text')
    form.append('content[0].value', textInput.value)
    content.push({type: 'Text', value: textInput.value, displayOrder: 1000})
  }
  
  const loadFiles = async (input: HTMLInputElement) => {
    const loadingFiles = input.files
    if (loadingFiles == null) {
      return
    }
    
    const loadedFiles = await new FilesApi().upload("files", loadingFiles)
  }

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
        {...textInput}/>
      <Command/>
      <Smile/>
      <Microphone/>
    </form>
  )
}