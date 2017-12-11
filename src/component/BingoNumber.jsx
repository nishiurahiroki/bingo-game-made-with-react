import React from 'react'

const SMALL_FONT_STYLE = { fontSize : '2.3em' }
const BIG_FONT_STYLE = { fontSize : '11.2em' }

const BingoNumber = props => {
  const size = props.size || 'small'
  const value = props.value || ''
  const skeleton = props.isHit ? '' : '-skeleton'

  const fontStyle = ((value, size) => {
    if(100 > value) {
      return {}
    }

    if('small' === size) {
      return SMALL_FONT_STYLE
    }
    if('big' === size) {
      return BIG_FONT_STYLE
    }
  })(value, size)

  return (
    <div className={`circle ${size} skyblue${skeleton}`}>
      <div className={`char\-${size}`} style={fontStyle}>
        {value}
      </div>
    </div>
  )
}

export default BingoNumber
