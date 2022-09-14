import {BaseForm} from "./BaseForm";
import {ImageInput} from "../form/ImageInput";
import React, {ChangeEvent, Ref, useCallback, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useFormFiles} from "../../hooks/useFormFiles";
import {changeAvatar, updateAuthorizedUser} from "../../app/slices/authorizationSlice";
import {AuthorizedUserApi} from "../../api/AuthorizedUserApi";
import {Nothing} from "../../utils/functions";
import "styles/forms/edit-profile-form.sass"
import {fullName} from "../../utils/fullName";
import {useFlag} from "../../hooks/useFlag";
import {Modal} from "../Modal";
import {NameForm} from "./NameForm";
import {User} from "../../models";
import {useFitScrollHeight} from "../../hooks/useFitScrollHeight";
import {rightDiff} from "../../utils/rightDiff";

type Props = {
  hide: Nothing
  backClick: Nothing
  formRef?: Ref<HTMLDivElement>
}

const maxBioLength = 70

export const EditProfileForm = ({formRef, hide}: Props) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const token = useAppSelector(state => state.authorization.token)
  const [avatar, setAvatar] = useState(currentUser.avatarUrl)
  const files = useFormFiles()
  const avatarRef = useRef<HTMLImageElement>(null)
  const bioRef = useRef<HTMLTextAreaElement>(null)
  const fitBioScrollHeight = useFitScrollHeight(bioRef)
  const dispatch = useAppDispatch()
  const [nameFormVisible, showNameForm, hideNameForm] = useFlag(false)

  const loadImage = useCallback(async (input: HTMLInputElement) => {
    const urls = await files.upload(input)

    const newAvatar = urls[0]
    setAvatar(newAvatar)

    dispatch(changeAvatar(newAvatar))
    new AuthorizedUserApi(token).changeAvatar(newAvatar)
  }, [token])
  const [bio, setBio] = useState(currentUser.bio ?? "")
  const onBioChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.currentTarget.value)
    fitBioScrollHeight()
  }, [bio])
  const update = useCallback((user: Partial<User>) => {
    new AuthorizedUserApi(token)
      .update({...currentUser, ...user})
  }, [token, currentUser])
  const saveChanges = useCallback((user: Partial<User>) => {
    const changedUser = rightDiff(currentUser, user)
    if (Object.keys(changedUser).length) {
      update(changedUser)
      dispatch(updateAuthorizedUser(changedUser))
    }
  }, [update, currentUser])
  const onHide = useCallback(() => {
    saveChanges({bio})
    hide()
  }, [currentUser.bio, hide, bio])

  const renderNameForm = () => {
    return (
      <Modal name="edit-profile-name" hide={hideNameForm}>
        <NameForm user={currentUser} hide={hideNameForm} save={saveChanges}/>
      </Modal>
    )
  }

  useEffect(() => {
    setBio(currentUser.bio ?? "")
  }, [currentUser.bio])

  return (
    <BaseForm
      formRef={formRef}
      className="edit-profile-form"
      inDark={nameFormVisible}
    >
      {nameFormVisible && renderNameForm()}
      <div className="form-header edit-profile-header">
        <span onClick={onHide}>Back</span>
        <span className="form-title settings-title">Info</span>
        <a
          className="close settings-form-close"
          onClick={onHide}
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
            ref={bioRef}
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