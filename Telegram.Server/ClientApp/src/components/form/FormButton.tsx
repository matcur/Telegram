import React, {FC} from 'react'

type Props = {
  name: string
  disabled?: boolean
  onClick?: () => void
}

export const FormButton: FC<Props> = ({name, onClick = () => {}, disabled}) => {
  return (
    <button
      className="form-btn clear-btn"
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  )
}