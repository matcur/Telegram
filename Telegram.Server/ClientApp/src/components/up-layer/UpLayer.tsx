import React, {FC, ReactElement} from 'react'
import {classNames} from "../../utils/classNames";

type Props = {
  onClick: () => void
  leftElement: ReactElement
  leftElementVisible: boolean
  arbitraryElements?: (ReactElement | undefined)[]
  modalOpened: boolean
}

export const UpLayer: FC<Props> = ({
    leftElement,
    leftElementVisible,
    arbitraryElements = [],
    onClick,
    children,
    modalOpened,
  }) => {
  const visible = leftElementVisible || modalOpened
  
  return (
    <>
      <div
        className={classNames({
          'show-up-layer': visible,
          'up-layer': true,
        })}
        onClick={onClick}>
        <div
          className="left-element"
          onClick={e => e.stopPropagation()}>
          {leftElement}
        </div>
      </div>
      {arbitraryElements}
      {children}
    </>
  )
}