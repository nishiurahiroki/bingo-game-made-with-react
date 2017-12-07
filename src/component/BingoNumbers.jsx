import React from 'react'

import BingoNumber from './BingoNumber.jsx'

export default class BingoNumbers extends React.Component {
  _showBingoNumbers({min, max, hitNumbers}) {
    const bingoNumbers = []
    for(let i = min;i <= max;i++) { // TODO rubyのrange的なAPIどっかにないかな…
      const isHit = hitNumbers.some(hitNumber => hitNumber === i)

      bingoNumbers.push(
        <BingoNumber value={i} key={i} isHit={isHit} />
      )
    }
    return bingoNumbers
  }

  render() {
    return (
      <div className="results">
        {this._showBingoNumbers(this.props)}
      </div>
    )
  }
}
