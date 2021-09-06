import React, {FC} from 'react'

type Props = {

}

export const Toggler: FC<Props> = ({}: Props) => {
  return (
    <label className="toggler-container small-toggler">
      <input type="checkbox" className="toggler"/>
      <span className="checkmark"/>
    </label>
  )
}