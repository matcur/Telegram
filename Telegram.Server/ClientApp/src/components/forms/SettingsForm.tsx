import {ImageInput} from "../form/ImageInput";
import React, {useContext, useState} from "react";
import {useFormFiles} from "../../hooks/useFormFiles";
import {Item} from "../menus/left-menu/LeftMenuItem";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {UpLayerContext} from "../../contexts/UpLayerContext";
import {changeAvatar} from "../../app/slices/authorizationSlice";

export const SettingsForm = () => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const [avatar, setAvatar] = useState(currentUser.avatarUrl)
  const files = useFormFiles()
  const upLayer = useContext(UpLayerContext)
  const dispatch = useAppDispatch()
  
  const loadImage = async (input: HTMLInputElement) => {
    const urls = await files.upload(input)
    
    const newAvatar = urls[0]
    setAvatar(newAvatar)
    dispatch(changeAvatar(newAvatar))
  }
  const menuItem = (item: Item) => {
    return (
      <li className="settings-form__item">
        {item.name}
      </li>
    )
  }
  const hideUpLayer = () => {
    upLayer.setVisible(false)
    upLayer.setCentralElement(<div/>)
  }
  
  const menuItems: Item[] = [
    {name: 'Edit profile'},
    {name: 'Notifications'},
    {name: 'Privacy and Security'},
    {name: 'Chat Settings'},
    {name: 'Folders'},
    {name: 'Advanced'},
    {name: 'Language'},
  ]
  
  return (
    <div className="form settings-form">
      <div className="form-header settings-header">
        <span className="form-title settings-title">Settings</span>
        <a 
          className="close settings-form-close"
          onClick={hideUpLayer}
        />
      </div>
      <div className="settings-form__avatar-input">
        <div className="df aic">
          <ImageInput
            onSelected={loadImage}
            thumbnail={avatar}
            className={'big-avatar'}  
          />
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
    </div>
  )
}