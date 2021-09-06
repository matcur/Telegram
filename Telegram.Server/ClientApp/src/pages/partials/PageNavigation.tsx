import React, {FC} from 'react'
import {ReactComponent as LeftArrowIcon} from "public/svgs/left-arrow.svg";

type Props = {
  onBackClick?: () => void
}

export const PageNavigation: FC<Props> = ({onBackClick = () => {}}) => {
  return (
    <div className="navigation qr-code-navigation">
      <LeftArrowIcon onClick={onBackClick}/>
      <a className="settings-link navigation-link">SETTINGS</a>
    </div>
  )
}