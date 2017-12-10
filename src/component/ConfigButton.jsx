import React from 'react'

const ConfigButton = props => {
  return (
    <a
      href=""
      className="material-icons config-button"
      onClick={e => {
        e.preventDefault()
        props.onClick()
      }}
      >
      menu
    </a>
  )
}

export default ConfigButton
