import React, {createRef, FC, useState} from 'react'
import cat from "public/images/index/cat-3.jpg";

type Props = {
  onSelected: (e: HTMLInputElement) => Promise<string>
  initialThumbnail: string
}

export const ImageInput: FC<Props> = ({onSelected, initialThumbnail}) => {
  const [source, setSource] = useState(initialThumbnail)
  const input = createRef<HTMLInputElement>()

  const onClick = async () => {
    const newSource = onSelected(input.current!)
    setSource(await newSource)
  }

  return (
    <div
      className="image-input-wrapper"
      onClick={() => input.current?.click()}>
      <img
        src={cat}
        alt=""
        className="circle image-input"
        onClick={onClick}/>
      <input
        ref={input}
        type="file"
        className="file-input"/>
    </div>
  )
}