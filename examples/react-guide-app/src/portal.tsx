import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { MF } from 'thx-portal'
import { Loading } from '@alifd/next'

import './App.scss'

const GlobalStyle = createGlobalStyle`
  #portal {
    padding: var(--s-2, 8px);
    background-color: var(--color-fill1-1);
  }
  .GlobalStyle.styled {}
`

export default function Portal () {
  return <>
    <GlobalStyle />
    <h1>Portal</h1>
    <MF
      fallback={<Loading inline={false} style={{ height: 64 }} />}
      remote='/remote.js'
      library={'mm-portal-rule'}
      version={'1.0.0'}
      module='RuleEditor'
    />
  </>
}

ReactDOM.render(<Portal />, document.getElementById('portal'))
