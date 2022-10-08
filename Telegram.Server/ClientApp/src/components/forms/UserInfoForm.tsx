import React, {useCallback, useEffect, useRef, useState} from "react";
import {BaseForm} from "./BaseForm";
import {User} from "../../models";
import {Nothing} from "../../utils/functions";
import {fullName} from "../../utils/fullName";
import {InfoRow} from "../form/InfoRow";
import {IconColumn} from "../form/IconColumn";
import {InfoColumn} from "../form/InfoColumn";
import {Info} from "../form/Info";
import {ReactComponent as AboutMe} from "public/svgs/about-me.svg";
import cat from "../../public/images/index/cat-3.jpg";
import "styles/forms/user-info-form.sass"
import {activityStatus} from "../../utils/user/activityStatus";
import {initActiveWebsocket, onOffline, onOnline} from "../../app/chat/activeWebsocket";
import {useToken} from "../../hooks/useToken";
import {useDispatch} from "react-redux";
import {callWith} from "../../utils/array/callWith";

type Props = {
  user: User
  hide: Nothing
}

export const UserInfoForm = ({hide, user}: Props) => {
  const token = useToken()
  const stopWebhook = useRef<Nothing>()
  const [state, setState] = useState("offline")
  const userId = user.id
  
  useEffect(() => {
    initActiveWebsocket(userId, token)
      .then(callback => stopWebhook.current = callback)
    const unsubscribes = [
      onOnline(userId, () => setState("online")),
      onOffline(userId, () => setState("offline")),
    ]
    return () => {
      stopWebhook.current && stopWebhook.current()
      callWith(unsubscribes, undefined)
    }
  }, [userId])
  
  return (
    <BaseForm className="user-info-form vertical-form-padding middle-size-form">
      <div className="form-header form-header-padding">
        <div className="form-title">Info</div>
        <a
          className="close settings-form-close"
          onClick={hide}
        />
      </div>
      <div className="about-user df aic">
        <div className="user-info-form__avatar">
          <img className="circle big-avatar" src={cat}/>
        </div>
        <div className="settings-form__user-info">
          <div className="user-name middle-name">
            {fullName(user)}
          </div>
          <div className="activity-status active-status">
            {state}
          </div>
        </div>
      </div>
      <div className="form-splitter"/>
      <InfoRow>
        <IconColumn>
          <AboutMe style={{width: 30, height: 30, fill: '#fff'}}/>
        </IconColumn>
        <InfoColumn>
          {user.bio && <Info highlighter={user.bio} description="About me"/>}
          <Info highlighter={user.firstName} description="User name"/>
        </InfoColumn>
      </InfoRow>
    </BaseForm>
  )
}