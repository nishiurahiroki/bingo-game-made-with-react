import React from 'react'

export default class BingoNumber extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const size = this.props.size || 'small'
    const value = this.props.value || ''
    const skeleton = this.props.isHit ? '' : '-skeleton'

    return (
      <div className={'circle ' + size + ' skyblue' + skeleton}>
        <div className={'char-' + size}>
          {value}
        </div>
      </div>
    )
  }
}
