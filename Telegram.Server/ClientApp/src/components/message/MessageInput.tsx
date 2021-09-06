import React, {createRef, FC} from 'react'
import {ReactComponent as PaperClip} from 'public/svgs/paperclip.svg'
import {ReactComponent as Command} from 'public/svgs/command.svg'
import {ReactComponent as Smile} from 'public/svgs/smile.svg'
import {ReactComponent as Microphone} from 'public/svgs/microphone.svg'
import {useForm} from "react-hook-form";
import {Content} from "models";

type Props = {
  onSubmitting: (data: FormData, content: Content[]) => void
  textInput: {value: string, onChange: (e: React.FormEvent<HTMLInputElement> | string) => void}
}

type Form = {
  files: FileList
}

export const MessageInput: FC<Props> = ({onSubmitting, textInput}: Props) => {
  const {register, handleSubmit} = useForm<Form>()
  const form = createRef<HTMLFormElement>()

  const onSubmit = (data: Form) => {
    const files = data.files
    const form = new FormData()
    const content: Content[] = []

    seedForm(form, data, content, files);

    onSubmitting(form, content)
    textInput.onChange('')
  }

  const seedForm = (form: FormData, data: Form, content: Content[], files: FileList) => {
    form.append('content[0].type', 'Text')
    form.append('content[0].value', textInput.value)
    content.push({type: 'Text', value: textInput.value, displayOrder: 1000})
    for (let i = 0; i < files.length; i++) {
      form.append(`content[${i + 1}].type`, 'Image')
      form.append(`content[${i + 1}].value`, files[i])
      // make input with auto load files
      content.push({type: 'Image', value: '', displayOrder: 10000})
    }
  }

  return (
    <form
      className="message-form"
      onSubmit={handleSubmit(onSubmit)}
      ref={form}>
      <PaperClip/>
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