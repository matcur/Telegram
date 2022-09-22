import React, {FC} from "react"

type Props = {}

export const InfoRow: FC<Props> = ({children}) => {
  return (
    <div className="form-info-row">
      {children}
    </div>
  )
}