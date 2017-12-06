import React from 'react'
import { render } from 'react-dom'

import BingoNumber from './component/BingoNumber.jsx'
import BingoResults from './component/BingoResults.jsx'
import BingoDrawer from './service/BingoDrawer.js'

import DoButton from './component/DoButton.jsx'

const BINGO_MIN_NUMBER = 1
const BINGO_MAX_NUMBER = 75

class BingoGame extends React.Component {
  constructor() {
    super()

    this.state = {
      showRandomNumber : false,
      currentNumber : <BingoNumber size="big" isHit={true} value={1}/>,
      nowDrawing : '',
      doButton : <DoButton label="start" onClick={::this.startDrawing} />,
      bingoDrawer : new BingoDrawer({ min : BINGO_MIN_NUMBER, max : BINGO_MAX_NUMBER }),
      hitNumbers : []
    }
  }

  componentDidUpdate() {
    const doButton = this.state.nowDrawing ?
                      <DoButton label="stop" onClick={::this.finishDrawing} /> :
                      <DoButton label="start" onClick={::this.startDrawing} />

    this.state.doButton = doButton
  }

  startDrawing() {
    if(this.state.nowDrawing) {
      return
    }

    this.state.nowDrawing = setInterval(() => {
      const randomNumber = Math.floor( Math.random() * (99 + 1 - 1) ) + 1
      this.setState({
        currentNumber : <BingoNumber size="big" isHit={true} value={randomNumber}/>
      })
    }, 100)
  }

  finishDrawing() {
    clearInterval(
      this.state.nowDrawing
    )

    const hitNumber = this.state.bingoDrawer.draw()

    const hitNumbers = this.state.hitNumbers
    hitNumbers.push(hitNumber)

    this.setState({
      nowDrawing : '',
      doButton : <DoButton label="start" onClick={::this.startDrawing} />,
      currentNumber : <BingoNumber size="big" isHit={true} value={hitNumber}/>,
      hitNumbers
    })
  }

  render() {
    return (
      <div>
        {this.state.doButton}

        <button
          type="button"
          className="button-clear">
          Clear
        </button>

        <div className="main">
          {this.state.currentNumber}
        </div>

        <BingoResults
          min={BINGO_MIN_NUMBER}
          max={BINGO_MAX_NUMBER}
          hitNumbers={this.state.hitNumbers}
        />
      </div>
    )
  }
}


render(
  <BingoGame />,
  document.getElementById('bingo-game')
)
