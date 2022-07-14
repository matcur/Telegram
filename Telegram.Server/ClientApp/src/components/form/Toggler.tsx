import React from 'react'

type Props = {
  value: boolean
  setValue?: (value: boolean) => void
}

export const Toggler = ({value, setValue = () => {}}: Props) => {
  const valueColor = value ? "#276899" : "#6C7883"
  
  return (
    <label 
      className="toggler-container small-toggler"
      style={{background: valueColor}}
    >
      <input
        type="checkbox"
        className="toggler"
        checked={value}
        onChange={e => setValue(e.target.checked)}
      />
      <span
        className="checkmark"
        style={{borderColor: valueColor}}
      />
    </label>
  )
}