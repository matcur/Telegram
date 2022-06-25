import React, {FC, ReactElement} from 'react'
import {empty} from "../../utils/array/empty";

type Props = {
  onClick: () => void
  leftElement: ReactElement
  leftElementVisible: boolean
  centerElements?: ReactElement[]
  arbitraryElements?: ReactElement[]
}

const centralElementZIndex = 1000;

export const UpLayer: FC<Props> = ({
    leftElement,
    leftElementVisible,
    centerElements = [],
    arbitraryElements = [],
    onClick,
    children
  }) => {
  const visible = leftElementVisible || !empty(centerElements)
  
  return (
    <>
      <div
        className={'up-layer' + (visible? ' show-up-layer': '')}
        onClick={onClick}>
        <div
          className="left-element"
          onClick={e => e.stopPropagation()}>
          {leftElement}
        </div>
        <div
          className="center-element"
          onClick={e => e.stopPropagation()}>
          {centerElements.map((element, i) =>
            <div style={{zIndex: centralElementZIndex + i, position: "absolute"}}>{element}</div>
          )}
        </div>
      </div>
      {arbitraryElements}
      {children}
    </>
  )
}