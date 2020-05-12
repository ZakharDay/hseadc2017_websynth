import React from 'react'
import ReactDOM from 'react-dom'
import WeatherContainer from '../containers/WeatherContainer'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <WeatherContainer name={'Rap'} />,
    document.body.appendChild(document.createElement('div'))
  )
})
