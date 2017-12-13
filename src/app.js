import React from 'react'
import { render } from 'react-dom'

import BingoNumber from './component/BingoNumber.jsx'
import BingoNumbers from './component/BingoNumbers.jsx'
import BingoDrawer from './service/BingoDrawer.js'

import DoButton from './component/DoButton.jsx'
import ConfigButton from './component/ConfigButton.jsx'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import ConfigArea from './component/ConfigArea.jsx'

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
      hitNumbers : [],
      isOpenConfig : false,
      max : BINGO_MAX_NUMBER,
      min : BINGO_MIN_NUMBER,
      reSettingMax : BINGO_MAX_NUMBER,
      reSettingMin : BINGO_MIN_NUMBER,
      reSettingMaxError : '',
      reSettingMinError : ''
    }
  }

  componentWillMount() {
    document.body.addEventListener('keydown', ::this.onEnterKeyDown)
    document.body.addEventListener('keyup', ::this.onEnterKeyUp)
  }

  onEnterKeyDown(e) {
    if(KEY_CODE_ENTER === e.keyCode) {
      document.activeElement.blur()
    }
  }

  onEnterKeyUp(e) {
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
    this.state.doButton = this.state.nowDrawing ?
                            <DoButton label="stop" onClick={::this.finishDrawing} /> :
                            <DoButton label="start" onClick={::this.startDrawing} />
  }

  isFinished() {
    return this.state.hitNumbers.length >= ((this.state.max - this.state.min) + 1)
  }

  startDrawing() {
    if(this.state.nowDrawing) {
      return
    }

    if(this.isFinished()) {
      return
    }

    this.state.nowDrawing = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * (this.state.max - this.state.min + 1) + this.state.min)
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
    const shouldReset = confirm('抽選結果をすべてクリアします。よろしいですか?')
    if(shouldReset) {
      clearInterval(
        this.state.nowDrawing
      )

      this.setState({
        currentNumber : <BingoNumber size="big" isHit={true} value={0}/>,
        nowDrawing : false,
        doButton : <DoButton label="start" onClick={::this.startDrawing} />,
        bingoDrawer : new BingoDrawer({ min : this.state.min, max : this.state.max }),
        hitNumbers : [],
        reSettingMaxError : '',
        reSettingMinError : ''
      })
    }
  }

  toggleConfigArea() {
    this.setState({ isOpenConfig : !this.state.isOpenConfig })
  }

  syncValue(e) {
    const changedState = {}
    changedState[e.target.name] = e.target.value

    this.setState(changedState)
  }

  clearConfigErrorMessage() {
    this.setState({
      reSettingMaxError : '',
      reSettingMinError : ''
    })
  }

  saveConfigAndRestart() {
    this.clearConfigErrorMessage()

    const reSettingMax = +this.state.reSettingMax
    const reSettingMin = +this.state.reSettingMin

    const validateTargets = [
                              {
                                target : 'min',
                                value : reSettingMin
                              },
                              {
                                target : 'max',
                                value : reSettingMax
                              }
                            ]

    const isNanError = ((validateTargets, _this) => {
      let result = false
      validateTargets.forEach(props => {
        if(!props.value || isNaN(props.value) || 0 > props.value) {
          const errorMessage = {}
          errorMessage[`reSetting${props.target.charAt(0).toUpperCase() + props.target.slice(1)}Error`] = `${props.target}には1以上の半角数値を入力してください`
          _this.setState(errorMessage)
          result = true
          return
        }
      })
      return result
    })(validateTargets, this)

    if(isNanError) {
      return
    }

    if(reSettingMin >= reSettingMax) {
      this.setState({ reSettingMaxError : 'minより大きい値を入力して下さい' })
      return
    }

    clearInterval(
      this.state.nowDrawing
    )

    this.setState({
      currentNumber : <BingoNumber size="big" isHit={true} value={0}/>,
      nowDrawing : false,
      doButton : <DoButton label="start" onClick={::this.startDrawing} />,
      bingoDrawer : new BingoDrawer({ min : reSettingMin, max : reSettingMax }),
      hitNumbers : [],
      max : reSettingMax,
      min : reSettingMin,
      isOpenConfig : !this.state.isOpenConfig,
      reSettingMaxError : '',
      reSettingMinError : ''
    })
  }

  render() {
    return (
      <div>
        {this.state.doButton}

        <ConfigButton
          onClick={::this.toggleConfigArea}
        />
        <ConfigArea
          onRequestChange={::this.toggleConfigArea}
          open={this.state.isOpenConfig}
        >
          <TextField
            hintText="Min"
            floatingLabelText="Min"
            style={{ marginLeft:'1vw' }}
            defaultValue={this.state.min}
            onChange={::this.syncValue}
            name="reSettingMin"
            errorText={this.state.reSettingMinError}
            underlineShow={false} />
          <TextField
            hintText="Max"
            floatingLabelText="Max"
            style={{ marginLeft:'1vw' }}
            defaultValue={this.state.max}
            onChange={::this.syncValue}
            name="reSettingMax"
            errorText={this.state.reSettingMaxError}
            underlineShow={false} />
          <RaisedButton
            label="save & reStart"
            primary={true}
            icon={<i className="material-icons">refresh</i>}
            fullWidth={true}
            onClick={::this.saveConfigAndRestart}
          />
          <RaisedButton
            label="Secondary"
            secondary={true}
            label="close"
            icon={<i className="material-icons">close</i>}
            style={{ marginTop : '4.0vh' }}
            fullWidth={true}
            onClick={::this.toggleConfigArea}
          />
        </ConfigArea>

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
          min={this.state.min}
          max={this.state.max}
          hitNumbers={this.state.hitNumbers}
        />
      </div>
    )
  }
}


render(
  (
    <MuiThemeProvider>
      <BingoGame />
    </MuiThemeProvider>
  ),
  document.getElementById('bingo-game')
)
