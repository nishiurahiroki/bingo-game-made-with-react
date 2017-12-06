import React from 'react'

const DoButton = props => {
  return (
    <button
      type="button"
      className="button-bingo"
      onClick={props.onClick}
      >
      {props.label}
    </button>
  )
}

export default DoButton
