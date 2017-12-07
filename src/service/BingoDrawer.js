export default class BingoDrawer {
  constructor(props) {
    this.bingoNumbers = this._createBingoNumbers(props)
  }

  draw() {
    const stockNumbers = Object.keys(this.bingoNumbers)
    if(0 === stockNumbers.length) {
      return null
    }

    const drawIndex = stockNumbers[Math.floor(Math.random() * stockNumbers.length)]
    const drawNumber = this.bingoNumbers[drawIndex]

    delete this.bingoNumbers[drawIndex]

    return drawNumber
  }

  _createBingoNumbers({min, max}) {
    const bingoNumbers = {}
    for(let i = min;i <= max;i++) { // TODO rubyのrange的なAPIどっかにないかな…
      bingoNumbers[i] = i
    }
    return bingoNumbers
  }
}
