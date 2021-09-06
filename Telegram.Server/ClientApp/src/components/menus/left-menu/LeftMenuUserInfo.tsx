import React, {FC} from 'react'
import cat from "public/images/index/cat-3.jpg";
import {ReactComponent as Caret} from "public/svgs/caret.svg";

type Props = {

}

export const LeftMenuUserInfo: FC<Props> = ({}: Props) => {
  return (
    <div className="left-menu-user-info">
      <div className="df jcsb aic top-part">
        <img className="circle middle-avatar" src={cat} alt="image"/>
        <div className="circle saved-messages">
          <Caret/>
        </div>
      </div>
      <div className="df jcsb aic bottom-part">
        <div className="user-details">
          <div className="user-name">Resurect Resurectovic</div>
          <div className="phone-number">+7 944 123 22 22</div>
        </div>
      </div>
    </div>
  )
}