Number.prototype.times = function (cb) {
  var i = -1

  while (++i < this) {
    cb(i)
  }

  return +this
}

import React from 'react'
import ReactDOM from 'react-dom'
import MonkContainer from '../containers/MonkContainer'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MonkContainer />,
    document.body.appendChild(document.createElement('div'))
  )
})
