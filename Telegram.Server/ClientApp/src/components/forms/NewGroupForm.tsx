import React, {FC, useContext, useEffect, useState} from 'react'
import {FormButton} from "components/form/FormButton";
import {ImageInput} from "components/form/ImageInput";
import {TextInput} from "components/form/TextInput";
import {InputEvent, useFormInput} from "hooks/useFormInput";
import {UpLayerContext} from "contexts/UpLayerContext";
import {AddMembersForm} from "components/forms/AddMembersForm";

type Props = {

}

export const NewGroupForm: FC<Props> = ({}) => {
  const context = useContext(UpLayerContext)
  const [name, setName] = useState('')
  const [nameEntered, setNameEntered] = useState(false)

  const loadImage = (input: HTMLInputElement) => {
    return new Promise(() => {}).then(() => 'an-image');
  }
  const hideUpLayer = () => {
    context.setVisible(false)
    context.setCentralElement(<div/>)
  }
  const showNextStep = () => {
    context.setCentralElement(<AddMembersForm chatName={name}/>)
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
            initialThumbnail=""/>
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