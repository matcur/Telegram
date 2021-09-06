import React, {FC} from 'react'

type Props = {
  name: string
  onClick?: () => void
}

export const FormButton: FC<Props> = ({name, onClick = () => {}}) => {
  return (
    <button
      className="form-btn clear-btn"
      onClick={onClick}>
      {name}
    </button>
  )
}