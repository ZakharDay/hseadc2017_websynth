import React from 'react'
import ReactDOM from 'react-dom'
import { ActionCableProvider } from 'react-actioncable-provider'
import SynthContainer from '../containers/SynthContainer'

const API_WS_ROOT = 'ws://localhost:3000/cable'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ActionCableProvider url={API_WS_ROOT}>
      <SynthContainer />
    </ActionCableProvider>,
    document.body.appendChild(document.createElement('div'))
  )
})
