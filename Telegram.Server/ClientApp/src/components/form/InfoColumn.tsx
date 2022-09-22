import React, {FC} from "react"

type Props = {}

export const InfoColumn: FC<Props> = ({children}) => {
  return (
    <div className="form-info-column">
      {children}
    </div>
  )
}