import React, {FC, ReactElement} from 'react'

type Props = {
  item: Item
}

export type Item = {
  name: string
  icon: ReactElement
  additionalElement?: ReactElement
  onClick?: () => void
}

export const LeftMenuItem: FC<Props> = ({item}: Props) => {
  return (
    <div
      className="left-menu-option"
      onClick={item.onClick}>
      {item.icon}
      <div className="option-name">{item.name}</div>
      {item.additionalElement}
    </div>
  )
}