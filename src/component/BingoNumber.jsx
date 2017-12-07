import React from 'react'

const BingoNumber = props => {
  const size = props.size || 'small'
  const value = props.value || ''
  const skeleton = props.isHit ? '' : '-skeleton'

  return (
    <div className={'circle ' + size + ' skyblue' + skeleton}>
      <div className={'char-' + size}>
        {value}
      </div>
    </div>
  )
}

export default BingoNumber
