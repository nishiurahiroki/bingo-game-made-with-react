export default class BingoDrawer {
  constructor(props) {
    this.bingoNumbers = this._createBingoNumbers(props)
    console.log(this.bingoNumbers);
  }

  draw() {
    const bingoNumbersKeys = Object.keys(this.bingoNumbers)
    if(0 === bingoNumbersKeys.length) {
      return null
    }

    const drawIndex = bingoNumbersKeys[Math.floor(Math.random() * bingoNumbersKeys.length)]
    const drawNumber = this.bingoNumbers[drawIndex]

    delete this.bingoNumbers[drawIndex]
    return drawNumber
  }

  _createBingoNumbers({min, max}) {
    const bingoNumbers = {}
    for(let i = min;i <= max;i++) {
      bingoNumbers[i] = i
    }
    return bingoNumbers
  }
}
