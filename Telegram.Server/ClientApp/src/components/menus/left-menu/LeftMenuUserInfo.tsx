import React from 'react'
import cat from "public/images/index/cat-3.jpg";
import {ReactComponent as Caret} from "public/svgs/caret.svg";
import {useAppSelector} from "../../../app/hooks";

export const LeftMenuUserInfo = () => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)

  return (
    <div className="left-menu-user-info">
      <div className="df jcsb aic top-part">
        <img className="circle middle-avatar" src={currentUser.avatarUrl} alt="user-avatar"/>
        <div className="circle saved-messages">
          <Caret/>
        </div>
      </div>
      <div className="df jcsb aic bottom-part">
        <div className="user-details">
          <div className="user-name">{currentUser.firstName} {currentUser.lastName}</div>
          <div className="phone-number">{currentUser.phone?.number}</div>
        </div>
      </div>
    </div>
  )
}