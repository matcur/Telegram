import React, {FC, useContext, useEffect, useRef, useState} from 'react'
import {FormButton} from "components/form/FormButton";
import {ImageInput} from "components/form/ImageInput";
import {TextInput} from "components/form/TextInput";
import {InputEvent} from "hooks/useFormInput";
import {UpLayerContext} from "contexts/UpLayerContext";
import {AddMembersForm} from "components/forms/AddMembersForm";
import {useFormFiles} from "../../hooks/useFormFiles";
import {addChat} from "../../app/slices/authorizationSlice";
import {User} from "../../models";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {AuthorizedUserApi} from "../../api/AuthorizedUserApi";
import {BaseForm} from "./BaseForm";
import {Modal} from "../Modal";

type Props = {
  initName?: string
  initIcon?: string
  hide: () => void
}

export const NewGroupForm: FC<Props> = ({initName = '', initIcon = '', hide}) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const upLayer = useContext(UpLayerContext)
  const [name, setName] = useState(initName)
  const [nameEntered, setNameEntered] = useState(false)
  const [icon, setIcon] = useState(initIcon)
  const [nextClicked, setNextClicked] = useState(false)
  const files = useFormFiles()
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.authorization.token)
  const [potentialMembers, setPotentialMembers] = useState<User[]>([])
  const [futureMembers, setFutureMembers] = useState<User[]>([])
  const membersRef = useRef<User[]>([])
  const [showAddMembersForm, setShowAddMembersForm] = useState(false)
  membersRef.current = futureMembers
  
  useEffect(() => {
    new AuthorizedUserApi(token).contacts()
      .then(res => setPotentialMembers(res))
  }, [])

  const createChat = async (members: User[]) => {
    const chat = {
      name: name,
      iconUrl: icon,
      members: [
        {...currentUser, chats: []},
        ...members
      ]
    }
    dispatch(addChat(await new AuthorizedUserApi(token).addChat(chat)))
  }
  const onCreate = async () => {
    await createChat(membersRef.current)
    upLayer.hide()
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
          onClick={() => setShowAddMembersForm(false)}/>
        <FormButton
          name="Create"
          onClick={onCreate}
          disabled={futureMembers.length === 0}
        />
      </div>
    )
    return (
      <Modal key={"new_members_form"}>
        <AddMembersForm
          potentialMembers={potentialMembers}
          footer={footer}
          selected={futureMembers}
          setSelected={setFutureMembers}
        />
      </Modal>
    )
  }
  const formValid = () => name !== ''
  const onNextClick = () => {
    setNextClicked(true)
    if (formValid()) {
      setShowAddMembersForm(true)
    }
  }
  const onNameChange = (e: InputEvent) => {
    setName(e.currentTarget.value)
    setNameEntered(true)
  }

  return (
    <BaseForm className="new-group-form">
      {showAddMembersForm && addMembersModal()}
      <div className="inputs">
        <div className="df aic">
          <ImageInput
            onSelected={loadImage}
            thumbnail={icon}/>
          <TextInput
            label="Group Name"
            input={{value: name, onChange: onNameChange}}
            className={formValid() || (!nameEntered && !nextClicked)? '': 'invalid-group'}/>
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