import {ImageInput} from "../form/ImageInput";
import React, {useRef, useState} from "react";
import {useFormFiles} from "../../hooks/useFormFiles";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {changeAvatar} from "../../app/slices/authorizationSlice";
import {AuthorizedUserApi} from "../../api/AuthorizedUserApi";
import {ReactComponent as CameraIcon} from "public/svgs/camera.svg";
import {BaseForm} from "./BaseForm";

type Props = {
  hide: () => void
}

export const SettingsForm = ({hide}: Props) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const token = useAppSelector(state => state.authorization.token)
  const [avatar, setAvatar] = useState(currentUser.avatarUrl)
  const files = useFormFiles()
  const avatarRef = useRef<HTMLImageElement>(null)
  const dispatch = useAppDispatch()
  const [menuItems] = useState(() => [
    {name: 'Edit profile'},
    {name: 'Notifications'},
    {name: 'Privacy and Security'},
    {name: 'Chat Settings'},
    {name: 'Folders'},
    {name: 'Advanced'},
    {name: 'Language'},
  ])
  
  const loadImage = async (input: HTMLInputElement) => {
    const urls = await files.upload(input)
    
    const newAvatar = urls[0]
    setAvatar(newAvatar)
    
    dispatch(changeAvatar(newAvatar))
    new AuthorizedUserApi(token).changeAvatar(newAvatar)
  }
  const menuItem = (item: {name: string}) => {
    return (
      <li className="settings-form__item form-row-hover">
        {item.name}
      </li>
    )
  }
  const onAvatarClick = () => {
    const current = avatarRef.current;
    if (current !== null) {
      current.click()
    }
  }
  
  return (
    <BaseForm className="settings-form">
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
            <div className="user-activity-status">
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
  )
}