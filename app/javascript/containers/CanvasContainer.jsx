import React, { Component } from 'react'

export default class SynthContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
      w: 150,
      h: 100,
      fill: 'green'
    }

    this.changeRectangle = this.changeRectangle.bind(this)
    this.renderCanvas = this.renderCanvas.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)

    this.refX = React.createRef()
    this.refY = React.createRef()
    this.refW = React.createRef()
    this.refH = React.createRef()
    this.refFill = React.createRef()
  }

  componentDidMount() {
    this.renderCanvas()
    // document.onmousemove = this.handleMouseMove

    const canvas = document.getElementById('canvas')
    canvas.addEventListener('mousemove', this.handleMouseMove, false)
  }

  componentDidUpdate() {
    this.renderCanvas()
  }

  handleMouseMove(e) {
    // var eventDoc, doc, body
    //
    // event = event || window.event // IE-ism
    //
    // // If pageX/Y aren't available and clientX/Y are,
    // // calculate pageX/Y - logic taken from jQuery.
    // // (This is to support old IE)
    // if (event.pageX == null && event.clientX != null) {
    //   eventDoc = (event.target && event.target.ownerDocument) || document
    //   doc = eventDoc.documentElement
    //   body = eventDoc.body
    //
    //   event.pageX =
    //     event.clientX +
    //     ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
    //     ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
    //   event.pageY =
    //     event.clientY +
    //     ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
    //     ((doc && doc.clientTop) || (body && body.clientTop) || 0)
    // }
    //
    // // Use event.pageX / event.pageY here
    //
    console.log(event.pageX, event.pageY)

    const cors = event.target.getBoundingClientRect()

    this.setState({
      w: event.pageX - cors.x,
      h: event.pageY - cors.y
    })
  }

  renderCanvas() {
    const { x, y, w, h, fill } = this.state

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = fill
    ctx.fillRect(x, y, w, h)
  }

  changeRectangle() {
    const x = this.refX.current.value
    const y = this.refY.current.value
    const w = this.refW.current.value
    const h = this.refH.current.value
    const fill = this.refFill.current.value

    this.setState({
      x: x,
      y: y,
      w: w,
      h: h,
      fill: fill
    })
  }

  render() {
    const { x, y, w, h, fill } = this.state

    return (
      <div>
        <canvas id="canvas"></canvas>

        <input ref={this.refX} />
        <input ref={this.refY} />
        <input ref={this.refW} />
        <input ref={this.refH} />
        <input ref={this.refFill} />

        <button onClick={this.changeRectangle}>Change Rectangle</button>
      </div>
    )
  }
}
