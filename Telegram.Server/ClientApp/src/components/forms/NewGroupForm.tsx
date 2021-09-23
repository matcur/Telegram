import React, {FC, useContext, useState} from 'react'
import {FormButton} from "components/form/FormButton";
import {ImageInput} from "components/form/ImageInput";
import {TextInput} from "components/form/TextInput";
import {InputEvent} from "hooks/useFormInput";
import {UpLayerContext} from "contexts/UpLayerContext";
import {AddMembersForm} from "components/forms/AddMembersForm";
import {useFormFiles} from "../../hooks/useFormFiles";

type Props = {
  initName?: string
  initIcon?: string
}

export const NewGroupForm: FC<Props> = ({initName = '', initIcon = ''}) => {
  const context = useContext(UpLayerContext)
  const [name, setName] = useState(initName)
  const [nameEntered, setNameEntered] = useState(false)
  const [icon, setIcon] = useState(initIcon)
  const files = useFormFiles()

  const loadImage = async (input: HTMLInputElement) => {
    await files.upload(input)
    setIcon(files.urls[0])
  }
  const hideUpLayer = () => {
    context.setVisible(false)
    context.setCentralElement(<div/>)
  }
  const showNextStep = () => {
    context.setCentralElement(<AddMembersForm chatName={name} chatIcon={icon}/>)
  }
  const formValid = () => name !== ''
  const onNextClick = () => {
    if (formValid()) {
      showNextStep()
    }
  }
  const onNameChange = (e: InputEvent) => {
    setName(e.currentTarget.value)
    setNameEntered(true)
  }

  return (
    <div className="form new-group-form">
      <div className="inputs">
        <div className="df aic">
          <ImageInput
            onSelected={loadImage}
            thumbnail={icon}/>
          <TextInput
            label="Group Name"
            input={{value: name, onChange: onNameChange}}
            className={formValid() || !nameEntered? '': 'invalid-group'}/>
        </div>
      </div>
      <div className="form-buttons">
        <FormButton
          name="Cancel"
          onClick={hideUpLayer}/>
        <FormButton
          name="Next"
          onClick={onNextClick}/>
      </div>
    </div>
  )
}