import React, { Component } from 'react'

export default class City extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { temp, name } = this.props

    return (
      <div className="City">
        <h1>{name}</h1>
        <p>Temperature: {temp}</p>
      </div>
    )
  }
}
