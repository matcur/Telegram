import React from 'react'
import leftPart from 'public/images/start/start-left-part.png'
import rightPart from 'public/images/start/start-right-part.png'
import airplane from 'public/images/start/start-airplane.png'
import {Link} from "react-router-dom";

type Props = {}

const Start = ({}: Props) => {
  return (
    <div className="page start-page">
      <div className="start-image">
        <img src={leftPart} alt="" className="start-left-part"/>
        <img src={airplane} alt="" className="start-airplane"/>
        <img src={rightPart} alt="" className="start-left-part"/>
      </div>
      <div className="start-block">
        <div className="start-title page-title">
          Telegram Desktop
        </div>
        <div className="start-welcome">
          <p>Welcome to the official Telegram Desktop app.</p>
          <p>It's fast and secure.</p>
        </div>
        <Link to="login" className="btn btn-primary start-messaging-btn">START MESSAGING</Link>
      </div>
    </div>
  )
}

export {Start}