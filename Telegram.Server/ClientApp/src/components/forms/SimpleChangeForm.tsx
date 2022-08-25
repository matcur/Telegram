import React, {FC} from "react";
import {BaseForm} from "./BaseForm";
import {FormButton} from "../form/FormButton";
import "styles/forms/simple-change-form.sass"

type Props = {
  title: string
  onSave(): void
  onClose(): void
}

export const SimpleChangeForm: FC<Props> = ({title, onSave, onClose, children}) => {
  return (
    <BaseForm className="simple-change-form">
      <div className="form-header simple-change-form-header">
        <div className="form-title">{title}</div>
      </div>
      {children}
      <div className="form-buttons">
        <FormButton
          name="Cancel"
          onClick={onClose}/>
        <FormButton
          name="Save"
          onClick={onSave}/>
      </div>
    </BaseForm>
  )
}