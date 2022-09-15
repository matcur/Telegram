import React, {FC, useEffect, useRef, useState} from 'react'
import {FormButton} from "components/form/FormButton";
import {ImageInput} from "components/form/ImageInput";
import {TextField} from "components/form/TextField";
import {InputEvent} from "hooks/useFormInput";
import {AddMembersForm} from "components/forms/AddMembersForm";
import {useFormFiles} from "../../hooks/useFormFiles";
import {addChat} from "../../app/slices/authorizationSlice";
import {User} from "../../models";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {AuthorizedUserApi} from "../../api/AuthorizedUserApi";
import {BaseForm} from "./BaseForm";
import {Modal} from "../Modal";
import {useFlag} from "../../hooks/useFlag";
import {useKeyup} from "../../hooks/useKeyup";

type Props = {
  initName?: string
  initIcon?: string
  hide: () => void
}

export const NewGroupForm: FC<Props> = ({initName = '', initIcon = '', hide}) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const [name, setName] = useState(initName)
  const [nameEntered, setNameEntered] = useState(false)
  const [icon, setIcon] = useState(initIcon)
  const [nextClicked, setNextClicked] = useState(false)
  const files = useFormFiles()
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.authorization.token)
  const [potentialMembers, setPotentialMembers] = useState<User[]>([])
  const [selectedMembers, setSelectedMembers] = useState<User[]>([])
  const nameRef = useRef<HTMLInputElement>(null)
  const [addMembersVisible, showAddMembers, hideAddMembers] = useFlag(false)

  const createChat = async (members: User[]) => {
    const chat = {
      name: name,
      iconUrl: icon,
      members: [
        {...currentUser, chats: []},
        ...members
      ]
    }
    dispatch(addChat(await new AuthorizedUserApi(token).addGroup(chat)))
  }
  const onCreate = async () => {
    if (!selectedMembers.length) {
      return
    }
    await createChat(selectedMembers)
    hideAddMembers()
    hide()
  }
  const loadImage = async (input: HTMLInputElement) => {
    const urls = await files.upload(input)
    setIcon(urls[0])
  }
  const addMembersModal = () => {
    const footer = (
      <div className="form-buttons add-members-buttons">
        <FormButton
          name="Cancel"
          onClick={hideAddMembers}/>
        <FormButton
          name="Create"
          onClick={onCreate}
          disabled={selectedMembers.length === 0}
        />
      </div>
    )
    return (
      <Modal hide={hideAddMembers} name={"new_members_form"}>
        <AddMembersForm
          potentialMembers={potentialMembers}
          footer={footer}
          selected={selectedMembers}
          setSelected={setSelectedMembers}
        />
      </Modal>
    )
  }
  const formValid = () => name !== ''
  const onNextClick = () => {
    setNextClicked(true)
    if (formValid()) {
      showAddMembers()
    }
  }
  const onNameChange = (e: InputEvent) => {
    setName(e.currentTarget.value)
    setNameEntered(true)
  }

  useEffect(() => {
    new AuthorizedUserApi(token).contacts()
      .then(res => setPotentialMembers(res))
  }, [])
  
  useEffect(() => {
    nameRef.current?.focus()
  }, [nameRef.current])
  
  useKeyup(() => {
    if (addMembersVisible) {
      return onCreate()
    }

    onNextClick()
  }, "Enter")

  return (
    <BaseForm className="new-group-form">
      {addMembersVisible && addMembersModal()}
      <div className="inputs">
        <div className="df aic">
          <ImageInput
            onSelected={loadImage}
            thumbnail={icon}/>
          <TextField
            label="Group Name"
            input={{value: name, onChange: onNameChange}}
            isInvalid={!formValid() && (nameEntered || nextClicked)}
            fieldRef={nameRef}
          />
        </div>
      </div>
      <div className="form-buttons">
        <FormButton
          name="Cancel"
          onClick={hide}/>
        <FormButton
          name="Next"
          onClick={onNextClick}/>
      </div>
    </BaseForm>
  )
}