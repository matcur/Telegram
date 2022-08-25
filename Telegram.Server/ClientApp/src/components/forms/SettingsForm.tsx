import {ImageInput} from "../form/ImageInput";
import React, {ReactElement, useCallback, useEffect, useRef, useState} from "react";
import {useFormFiles} from "../../hooks/useFormFiles";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {changeAvatar} from "../../app/slices/authorizationSlice";
import {AuthorizedUserApi} from "../../api/AuthorizedUserApi";
import {ReactComponent as CameraIcon} from "public/svgs/camera.svg";
import {BaseForm} from "./BaseForm";
import {Nothing} from "../../utils/functions";
import {EditProfileForm} from "./EditProfileForm";
import {classNames} from "../../utils/classNames";

import "styles/forms/settings-form.sass"

type Props = {
  hide: Nothing
}

type MenuItem = {
  name: string
  getForm?(hide: Nothing): ReactElement
}

export const SettingsForm = ({hide}: Props) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const token = useAppSelector(state => state.authorization.token)
  const [avatar, setAvatar] = useState(currentUser.avatarUrl)
  const files = useFormFiles()
  const avatarRef = useRef<HTMLImageElement>(null)
  const dispatch = useAppDispatch()
  const [menuItems] = useState<MenuItem[]>(() => [
    {name: 'Edit profile', getForm: (backClick: Nothing) => <EditProfileForm hide={hide} formRef={setRightFormRef} backClick={backClick}/>},
    {name: 'Notifications'},
    {name: 'Privacy and Security'},
    {name: 'Chat Settings'},
    {name: 'Folders'},
    {name: 'Advanced'},
    {name: 'Language'},
  ])
  const [innerForm, setInnerForm] = useState<(hide: Nothing) => ReactElement>()
  const [innerFormPendingClose, setInnerFormPendingClose] = useState(false)
  const hideInnerForm = () => {
    setInnerFormPendingClose(true)
    setRightFormHeight(0)
    setTimeout(() => {
      setInnerForm(undefined)
      setInnerFormPendingClose(false)
    }, 200)
  }
  const [settingsHeight, setSettingsHeight] = useState(0)
  const [rightFormHeight, setRightFormHeight] = useState(0)
  const [wrapHeight, setWrapHeight] = useState(0)

  const loadImage = useCallback(async (input: HTMLInputElement) => {
    const urls = await files.upload(input)

    const newAvatar = urls[0]
    setAvatar(newAvatar)

    dispatch(changeAvatar(newAvatar))
    new AuthorizedUserApi(token).changeAvatar(newAvatar)
  }, [token])
  const menuItem = useCallback((item: MenuItem) => {
    return (
      <li
        className="form-row small-form-row form-row-hover"
        onClick={() => item.getForm && setInnerForm(() => (hide: Nothing) => item.getForm!(hide))}
      >
        {item.name}
      </li>
    )
  }, [])
  const onAvatarClick = useCallback(() => {
    const current = avatarRef.current;
    if (current !== null) {
      current.click()
    }
  }, [])
  const [settingsObserver] = useState(() => (
    new ResizeObserver(elements => {
      elements.forEach(r => setSettingsHeight(r.target.clientHeight))
    })
  ))
  const [rightFormObserver] = useState(() => (
    new ResizeObserver(elements => {
      elements.forEach(r => setRightFormHeight(r.target.clientHeight))
    })
  ))
  const settingsRef = useRef<HTMLDivElement>()
  const rightFormRef = useRef<HTMLDivElement>()
  const setSettingsRef = useCallback((node: HTMLDivElement) => {
    settingsRef.current && settingsObserver.unobserve(settingsRef.current)
    node && settingsObserver.observe(node)

    setSettingsHeight(node?.clientHeight ?? 0)
    settingsRef.current = node
  }, [])
  const setRightFormRef = useCallback((node: HTMLDivElement) => {
    rightFormRef.current && rightFormObserver.unobserve(rightFormRef.current)
    node && rightFormObserver.observe(node)

    setRightFormHeight(node?.clientHeight ?? 0)
    rightFormRef.current = node
  }, [])

  useEffect(() => {
    if (rightFormHeight) {
      if (rightFormHeight === wrapHeight) {
        return
      }
      return setWrapHeight(rightFormHeight)
    }
    if (settingsHeight === wrapHeight) {
      return
    }
    return setWrapHeight(settingsHeight)
  }, [settingsHeight, rightFormHeight])

  return (
    <div style={{position: "relative", height: wrapHeight, transition: ".2s", width: 370, overflow: "hidden", display: "flex", background: "#17212B", borderRadius: 6}}>
      <BaseForm
        formRef={setSettingsRef}
        className={classNames({
          "transition-form": true,
          "settings-form": true,
          "left-transition-form": Boolean(!innerFormPendingClose && innerForm)
        })}
      >
        <div className="form-header settings-header">
          <span className="form-title settings-title">Settings</span>
          <a
            className="close settings-form-close"
            onClick={hide}
          />
        </div>
        <div className="settings-form__avatar-input">
          <div className="df aic">
            <div
              className="new-avatar"
              onClick={onAvatarClick}
            >
              <div className="new-avatar__camera">
                <CameraIcon style={{width: '30px', height: '20px', fill: '#fff'}}/>
              </div>
              <ImageInput
                ref={avatarRef}
                onSelected={loadImage}
                thumbnail={avatar}
                className={'big-avatar'}
              />
            </div>
            <div className="settings-form__user-info">
              <div className="user-name middle-name">
                {currentUser.firstName} {currentUser.lastName}
              </div>
              <div className="activity-status active-status">
                online
              </div>
            </div>
          </div>
        </div>
        <div className="form-splitter"/>
        <ul className="clear-menu new-group-form__menu">
          {menuItems.map(menuItem)}
        </ul>
      </BaseForm>
      <div
        className={classNames({
          "transition-form": true,
          "right-transition-form": true,
          "show-right-transition-form": Boolean(!innerFormPendingClose && innerForm)
        })}
      >
        {innerForm && innerForm(hideInnerForm)}
      </div>
    </div>
  )
}