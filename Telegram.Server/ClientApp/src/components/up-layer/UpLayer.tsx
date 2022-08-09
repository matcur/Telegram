import React, {FC, ReactElement} from 'react'

type Props = {
  onClick: () => void
  leftElement: ReactElement
  leftElementVisible: boolean
  arbitraryElements?: ReactElement[]
}

export const UpLayer: FC<Props> = ({
    leftElement,
    leftElementVisible,
    arbitraryElements = [],
    onClick,
    children
  }) => {
  const visible = leftElementVisible
  
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
      </div>
      {arbitraryElements}
      {children}
    </>
  )
}