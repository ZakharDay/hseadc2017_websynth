import React, { Component } from 'react'

export default class Cell extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleClick(this.props.id, this.props.monk)
  }

  render() {
    const { id, color, monk } = this.props

    let colors = [
      'aqua',
      'blue',
      'fuchsia',
      'green',
      'lime',
      'maroon',
      'navy',
      'olive'
    ]

    let cellColor = colors[Math.floor(Math.random() * colors.length)]
    let classnames = 'Cell'

    if (monk == true) {
      classnames += ' monk'
    }

    if (color == 'white') {
      classnames += ' white'
    }

    if (color == 'black') {
      classnames += ' black'
    }

    return (
      <div
        className={classnames}
        style={{ background: cellColor }}
        onClick={this.handleClick}
      ></div>
    )
  }
}
