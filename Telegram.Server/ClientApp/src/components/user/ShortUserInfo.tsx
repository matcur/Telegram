import React, {FC} from 'react'
import {User} from "models";
import cat from "public/images/index/cat-3.jpg";

type Props = {
  user: User
  onClick: (user: User) => void
  className?: string
}

export const ShortUserInfo: FC<Props> = ({className = '', user, onClick}) => {
  return (
    <div
      onClick={() => onClick(user)}
      className={`short-user-info-wrapper ${className}`}>
      <img
        // src={user.avatarUrl}
        src={cat}
        alt=""
        className="circle user-avatar small-user-avatar"/>
      <div className="short-user-info">
        <div className="user-name">{user.firstName + " " + user.lastName}</div>
        <div className="last-seen">last seen yeeeesterday</div>
      </div>
    </div>
  )
}