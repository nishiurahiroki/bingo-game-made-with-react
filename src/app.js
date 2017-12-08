import React from 'react'
import { render } from 'react-dom'

import BingoNumber from './component/BingoNumber.jsx'
import BingoNumbers from './component/BingoNumbers.jsx'
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
    document.body.addEventListener('keydown', ::this.onKeyEnter)
  }

  onKeyEnter(e) {
    if(KEY_CODE_ENTER !== e.keyCode) {
      return
    }
    document.activeElement.blur()

    if(this.state.nowDrawing) {
      this.finishDrawing()
    } else {
      this.startDrawing()
    }
  }

  componentDidUpdate() {
    this.state.doButton = this.state.nowDrawing ?
                            <DoButton label="stop" onClick={::this.finishDrawing} /> :
                            <DoButton label="start" onClick={::this.startDrawing} />
  }

  isFinished() {
    return this.state.hitNumbers.length >= ((BINGO_MAX_NUMBER - BINGO_MIN_NUMBER) + 1)
  }

  startDrawing() {
    if(this.state.nowDrawing) {
      return
    }

    if(this.isFinished()) {
      return
    }

    this.state.nowDrawing = setInterval(() => {
      const randomNumber = Math.floor( Math.random() * (BINGO_MAX_NUMBER + BINGO_MIN_NUMBER - 1) ) + BINGO_MIN_NUMBER
      this.setState({
        currentNumber : <BingoNumber size="big" isHit={true} value={randomNumber}/>
      })
    }, 85)
  }

  finishDrawing() {
    if(!this.state.nowDrawing) {
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
    const shouldReset = confirm('ビンゴの結果をすべてクリアします。よろしいですか?')
    if(shouldReset) {
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

        <BingoNumbers
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
