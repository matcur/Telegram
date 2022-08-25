import React, {createRef, forwardRef} from 'react'
import cat from "public/images/index/cat-3.jpg";

type Props = {
  onSelected: (e: HTMLInputElement) => void
  thumbnail: string
  name?: string
  className?: string
}

export const ImageInput = forwardRef<HTMLImageElement, Props>(({onSelected, thumbnail, name = 'files', className = 'image-input'}, ref) => {
  const input = createRef<HTMLInputElement>()

  const onClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    input.current!.click()
  }

  return (
    <div className="image-input-wrapper">
      <img
        src={thumbnail? thumbnail: cat}
        alt=""
        className={"circle " + className}
        style={{cursor: "pointer"}}
        onClick={onClick}
        ref={ref}/>
      <input
        ref={input}
        type="file"
        className="file-input"
        name={name}
        onChange={() => onSelected(input.current!)}/>
    </div>
  )
})