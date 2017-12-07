import React from 'react'
import { render } from 'react-dom'

import BingoNumber from './component/BingoNumber.jsx'
import BingoResults from './component/BingoResults.jsx'
import BingoDrawer from './service/BingoDrawer.js'

import DoButton from './component/DoButton.jsx'

const BINGO_MIN_NUMBER = 1
const BINGO_MAX_NUMBER = 75

const KEY_CODE_ENTER = 13

class BingoGame extends React.Component {
  constructor() {
    super()

    this.state = {
      currentNumber : <BingoNumber size="big" isHit={true} value={0}/>,
      nowDrawing : false,
      doButton : <DoButton label="start" onClick={::this.startDrawing} />,
      bingoDrawer : new BingoDrawer({ min : BINGO_MIN_NUMBER, max : BINGO_MAX_NUMBER }),
      hitNumbers : []
    }
  }

  componentWillMount() {
    // TODO enterキー押下時の機能実装
    // document.body.addEventListener('keydown', ::this.onKeyEnter)
  }

  onKeyEnter(e) {
    if(KEY_CODE_ENTER !== e.keyCode) {
      return
    }

    if(this.state.nowDrawing) {
      this.finishDrawing()
    } else {
      this.startDrawing()
    }
  }

  componentDidUpdate() {
    const doButton = this.state.nowDrawing ?
                      <DoButton label="stop" onClick={::this.finishDrawing} /> :
                      <DoButton label="start" onClick={::this.startDrawing} />

    this.state.doButton = doButton
  }

  isFinished() {
    return this.state.hitNumbers.length >= ((BINGO_MAX_NUMBER - BINGO_MIN_NUMBER) + 1)
  }

  startDrawing() {
    if(this.state.nowDrawing) { // ボタン連打対策
      return
    }

    if(this.isFinished()) {
      this.resetAll()
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
    if(!this.state.nowDrawing) { // ボタン連打対策
      return
    }

    clearInterval(
      this.state.nowDrawing
    )

    const hitNumber = this.state.bingoDrawer.draw()
    const hitNumbers = this.state.hitNumbers
    hitNumbers.push(hitNumber)

    this.setState({
      nowDrawing : false,
      doButton : <DoButton label="start" onClick={::this.startDrawing} />,
      currentNumber : <BingoNumber size="big" isHit={true} value={hitNumber}/>,
      hitNumbers
    })
  }

  resetAll() {
    clearInterval(
      this.state.nowDrawing
    )

    this.setState({
      currentNumber : <BingoNumber size="big" isHit={true} value={0}/>,
      nowDrawing : false,
      doButton : <DoButton label="start" onClick={::this.startDrawing} />,
      bingoDrawer : new BingoDrawer({ min : BINGO_MIN_NUMBER, max : BINGO_MAX_NUMBER }),
      hitNumbers : []
    })
  }

  render() {
    return (
      <div>
        {this.state.doButton}

        <button
          type="button"
          className="button-clear"
          onClick={::this.resetAll}
          >
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
