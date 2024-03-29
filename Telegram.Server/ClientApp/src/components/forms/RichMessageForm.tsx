import {TextField} from "../form/TextField";
import {useFormInput} from "../../hooks/useFormInput";
import {FormButton} from "../form/FormButton";
import {FC} from "react";
import {BaseForm} from "./BaseForm";
import React from "react";

type Props = {
  filePaths: string[]
  messageText: string
  onSend: (textMessage: string, filePaths: string[]) => void
}

export const RichMessageForm: FC<Props> = ({filePaths, messageText, onSend = () => {}}) => {
  const input = useFormInput(messageText)
  
  const file = (path: string, key: number) => {
    return <img key={key} src={path}/>
  }
  
  return (
    <BaseForm className="detail-message-form">
      <div className="message-form-files">
        {filePaths.map(file)}
      </div>
      <TextField label='Caption' input={input}/>
      <div className="form-buttons">
        <FormButton name="Cancel"/>
        <FormButton
          name="Send"
          onClick={() => onSend(input.value, filePaths)}/>
      </div>
    </BaseForm>
  )
}