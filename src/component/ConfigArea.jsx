import React from 'react'

import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

export default class ConfigArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open : this.props.open
    }
  }

  _toggle() {
    this.setState({ open : !this.state.open })
  }

  render() {
    return (
      <Drawer
        width={400}
        docked={false}
        openSecondary={true}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open} >
        {this.props.children}
      </Drawer>
    )
  }
}
