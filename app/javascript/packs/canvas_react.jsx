import React from 'react'
import ReactDOM from 'react-dom'
import CanvasContainer from '../containers/CanvasContainer'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CanvasContainer />,
    document.body.appendChild(document.createElement('div'))
  )
})
