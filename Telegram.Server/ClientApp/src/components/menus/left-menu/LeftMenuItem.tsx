import React, {FC, ReactElement} from 'react'
import {useCentralPosition} from "../../../hooks/useCentralPosition";

type Props = {
  name: string
  icon?: ReactElement
  additionalElement?: ReactElement
  getCentralElement?: (hide: () => void) => ReactElement
}

export const LeftMenuItem: FC<Props> = ({name, icon, additionalElement, getCentralElement}: Props) => {
  const centralPosition = useCentralPosition()
  const onClick = () => {
    getCentralElement && centralPosition.show(getCentralElement(centralPosition.hide))
  }
  
  return (
    <div
      className="left-menu-option"
      onClick={onClick}>
      {icon}
      <div className="option-name">{name}</div>
      {additionalElement}
    </div>
  )
}