import React from "react"

type Props = {
  highlighter: string
  description: string
}

export const Info = ({highlighter, description}: Props) => {
  return (
    <div className="form-info">
      <div className="info-highlighter">{highlighter}</div>
      <div className="info-description">{description}</div>
    </div>
  )
}