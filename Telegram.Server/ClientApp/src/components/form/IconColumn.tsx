import React, {FC} from "react"

type Props = {}

export const IconColumn: FC<Props> = ({children}) => {
  return (
    <div className="form-icon-column">
      {children}
    </div>
  )
}