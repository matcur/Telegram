import React, {createRef, FC} from 'react'

type Props = {
  onSelected?: (e: HTMLInputElement) => void
  name?: string
}

export const FileInput: FC<Props> = ({onSelected = e => {}, children, name = 'files'}) => {
  const input = createRef<HTMLInputElement>()

  const onClick = () => {
    input.current!.click()
  }

  return (
    <div
      className="image-input-wrapper"
      onClick={onClick}>
      {children}
      <input
        ref={input}
        type="file"
        className="file-input"
        name={name}
        onChange={() => onSelected(input.current!)}/>
    </div>
  )
}