import React from 'react'

export const Toggler = () => {
  return (
    <label className="toggler-container small-toggler">
      <input type="checkbox" className="toggler"/>
      <span className="checkmark"/>
    </label>
  )
}