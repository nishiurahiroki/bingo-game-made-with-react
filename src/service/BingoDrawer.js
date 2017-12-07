import ArrayExtension from '../utils/ArrayExtension.js'

export default class BingoDrawer {
  constructor(props) {
    this.bingoNumbers = this._createBingoNumbers(props)
  }

  draw() {
    const stockNumbers = Object.keys(this.bingoNumbers)
    if(0 === stockNumbers.length) {
      return
    }

    const drawIndex = stockNumbers[Math.floor(Math.random() * stockNumbers.length)]
    const drawNumber = this.bingoNumbers[drawIndex]

    delete this.bingoNumbers[drawIndex]

    return drawNumber
  }

  _createBingoNumbers({min, max}) {
    const bingoNumbers = {}
    ArrayExtension
      .range(min, max)
      .forEach(number => bingoNumbers[number] = number)
    return bingoNumbers
  }
}
