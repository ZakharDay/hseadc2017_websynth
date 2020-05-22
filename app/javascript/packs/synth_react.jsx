import React from 'react'
import ReactDOM from 'react-dom'
import SynthContainer from '../containers/SynthContainer'
import { ActionCableProvider } from 'react-actioncable-provider'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ActionCableProvider url="ws://localhost:3000/cable">
      <SynthContainer name={'Rap'} />
    </ActionCableProvider>,
    document.body.appendChild(document.createElement('div'))
  )
})
