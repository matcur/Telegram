import {BaseForm} from "./BaseForm";
import {ImageInput} from "../form/ImageInput";
import React, {ChangeEvent, Ref, useCallback, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useFormFiles} from "../../hooks/useFormFiles";
import {changeAvatar} from "../../app/slices/authorizationSlice";
import {AuthorizedUserApi} from "../../api/AuthorizedUserApi";
import {Nothing} from "../../utils/functions";
import "styles/forms/edit-profile-form.sass"
import {fullName} from "../../utils/fullName";
import {useFlag} from "../../hooks/useFlag";
import {Modal} from "../Modal";
import {NameForm} from "./NameForm";
import {User} from "../../models";

type Props = {
  hide: Nothing
  backClick: Nothing
  formRef?: Ref<HTMLDivElement>
}

const maxBioLength = 70

export const EditProfileForm = ({backClick, formRef, hide}: Props) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const token = useAppSelector(state => state.authorization.token)
  const [avatar, setAvatar] = useState(currentUser.avatarUrl)
  const files = useFormFiles()
  const avatarRef = useRef<HTMLImageElement>(null)
  const dispatch = useAppDispatch()
  const [nameFormVisible, showNameForm, hideNameForm] = useFlag(false)

  const loadImage = useCallback(async (input: HTMLInputElement) => {
    const urls = await files.upload(input)

    const newAvatar = urls[0]
    setAvatar(newAvatar)

    dispatch(changeAvatar(newAvatar))
    new AuthorizedUserApi(token).changeAvatar(newAvatar)
  }, [token])
  const onBioRefChange = (ref: HTMLTextAreaElement) => {
    if (!ref) {
      return
    }

    ref.style.height = "0"
    ref.style.height = `${ref.scrollHeight}px`
  }
  const [bio, setBio] = useState("")
  const onBioChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    const {style, value} = target

    setBio(value)
    style.height = "0"
    style.height = `${target.scrollHeight}px`
  }, [bio])
  const save = useCallback((user: Partial<User>) => {
    new AuthorizedUserApi(token)
      .update(user)
  }, [token])
  const onHide = useCallback(() => {
    save({bio})
    hide()
  }, [hide, bio])
  const renderNameForm = () => {
    return (
      <Modal name="edit-profile-name" hide={hideNameForm}>
        <NameForm user={currentUser} hide={hideNameForm} save={save}/>
      </Modal>
    )
  }

  return (
    <BaseForm
      formRef={formRef}
      className="edit-profile-form"
      inDark={nameFormVisible}
    >
      {nameFormVisible && renderNameForm()}
      <div className="form-header edit-profile-header">
        <span onClick={backClick}>Back</span>
        <span className="form-title settings-title">Info</span>
        <a
          className="close settings-form-close"
          onClick={hide}
        />
      </div>
      <div className="edit-profile-form__avatar-wrapper">
        <div className="edit-profile-avatar-layout">
          <ImageInput
            ref={avatarRef}
            onSelected={loadImage}
            thumbnail={avatar}
            className={'edit-profile-avatar'}
          />
        </div>
        <div className="edit-profile__user-name user-name">
          {fullName(currentUser)}
        </div>
        <div className="activity-status inactive-status">
          last seen recently
        </div>
        <div className="about-me-form">
          <textarea
            ref={onBioRefChange}
            onChange={onBioChange}
            value={bio}
            placeholder="Bio"
            className="clear-input about-me-input"
            maxLength={maxBioLength}
          />
          <div className="characters-left">
            {maxBioLength - bio.length}
          </div>
        </div>
      </div>
      <div className="edit-profile-fields">
        <div
          className="form-row small-form-row edit-profile-field"
          onClick={showNameForm}
        >
          <div className="field-name">Name</div>
          <div className="edit-form-row-value">{fullName(currentUser)}</div>
        </div>
      </div>
    </BaseForm>
  )
}