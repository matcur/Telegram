import React, {FC} from 'react'
import {Content} from "models";
import {ImageContent} from "components/content/ImageContent";
import {TextContent} from "components/content/TextContent";

type Props = {
  content: Content[]
}

const contentComponent = (content: Content, key: number) => {
  const factory = {
    Image: (content: Content, className = '') =>
      <ImageContent key={key} content={content} className={className}/>,
    Text: (content: Content, className = '') =>
      <TextContent key={key} content={content} className={className}/>,
  }

  return factory[content.type](content)
}

export const ComplexContent: FC<Props> = ({content}: Props) => {
  const compare = (a: Content, b: Content) => a.displayOrder - b.displayOrder

  return (
    <div className="complex-content">
      {content.sort(compare).map((c, key) => contentComponent(c, key))}
    </div>
  )
}