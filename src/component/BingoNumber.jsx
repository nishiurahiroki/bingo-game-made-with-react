import React from 'react'

const SMALL_CHAR_STYLE = { fontSize : '2.3em' }

const BingoNumber = props => {
  const size = props.size || 'small'
  const value = props.value || ''
  const skeleton = props.isHit ? '' : '-skeleton'

  const charSizeSetting = 100 <= value && 'small' === size
                          ? SMALL_CHAR_STYLE : {}

  return (
    <div className={`circle ${size} skyblue${skeleton}`}>
      <div className={`char\-${size}`} style={charSizeSetting}>
        {value}
      </div>
    </div>
  )
}

export default BingoNumber
