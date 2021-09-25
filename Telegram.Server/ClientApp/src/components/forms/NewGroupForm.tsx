import React, {FC, useContext, useState} from 'react'
import {FormButton} from "components/form/FormButton";
import {ImageInput} from "components/form/ImageInput";
import {TextInput} from "components/form/TextInput";
import {InputEvent} from "hooks/useFormInput";
import {UpLayerContext} from "contexts/UpLayerContext";
import {AddMembersForm} from "components/forms/AddMembersForm";
import {useFormFiles} from "../../hooks/useFormFiles";
import {ChatsApi} from "../../api/ChatsApi";
import {addChat} from "../../app/slices/authorizationSlice";
import {User} from "../../models";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

type Props = {
  initName?: string
  initIcon?: string
}

export const NewGroupForm: FC<Props> = ({initName = '', initIcon = ''}) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const upLayer = useContext(UpLayerContext)
  const [name, setName] = useState(initName)
  const [nameEntered, setNameEntered] = useState(false)
  const [icon, setIcon] = useState(initIcon)
  const files = useFormFiles()
  const dispatch = useAppDispatch()

  const createChat = async (members: User[]) => {
    const chat = {
      name: name,
      iconUrl: icon,
      members: [
        {...currentUser, chats: []},
        ...members
      ]
    }
    const response = await new ChatsApi().add(chat)

    dispatch(addChat(response.result))
  }
  const onCreate = async (members: User[]) => {
    await createChat(members)
    upLayer.hide()
  }
  const loadImage = async (input: HTMLInputElement) => {
    const urls = await files.upload(input)
    setIcon(urls[0])
  }
  const hideUpLayer = () => {
    upLayer.setVisible(false)
    upLayer.setCentralElement(<div/>)
  }
  const showNextStep = () => {
    upLayer.setCentralElement(<AddMembersForm onCreateClick={onCreate}/>)
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