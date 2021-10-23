import React, {createRef, FC} from 'react'
import cat from "public/images/index/cat-3.jpg";

type Props = {
  onSelected: (e: HTMLInputElement) => void
  thumbnail: string
  name?: string
  className?: string
}

export const ImageInput: FC<Props> = ({onSelected, thumbnail, name = 'files', className = 'image-input'}) => {
  const input = createRef<HTMLInputElement>()

  const onClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    input.current!.click()
  }

  return (
    <div
      className="image-input-wrapper">
      <img
        src={thumbnail? thumbnail: cat}
        alt=""
        className={"circle " + className}
        style={{cursor: "pointer"}}
        onClick={onClick}/>
      <input
        ref={input}
        type="file"
        className="file-input"
        name={name}
        onChange={() => onSelected(input.current!)}/>
    </div>
  )
}