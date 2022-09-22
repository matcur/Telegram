import React from "react";
import {FC} from "react";

type Props = {}

export const TextFields: FC<Props> = ({children}) => {
  return (
    <div className="text-fields">
      {children}
    </div>
  )
}