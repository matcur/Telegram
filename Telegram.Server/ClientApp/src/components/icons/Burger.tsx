import React, {FC} from 'react'

type Props = {
  onClick?: () => void
}

export const Burger: FC<Props> = ({onClick = () => {}}) => {
  return (
    <div
      className="burger index-burger"
      onClick={onClick}>
      <div className="burger-line"/>
      <div className="burger-line"/>
      <div className="burger-line"/>
    </div>
  )
}