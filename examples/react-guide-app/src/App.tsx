import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { RuleEditor } from 'thx-portal-rule'

import './App.scss'
import { MOCK_CONTENT, MOCK_MODEL_LIST } from './model'

const GlobalStyle = createGlobalStyle`
  #root {
    padding: var(--s-2, 8px);
  }
  .GlobalStyle.styled {}
`

export default function App () {
  const [content, setContent] = useState(MOCK_CONTENT)
  return <>
    <GlobalStyle />
    <RuleEditor models={MOCK_MODEL_LIST} content={content}
      onChange={(nextContent) => setContent(nextContent)}
    />
    <pre>{JSON.stringify(content, null, 2)}</pre>
  </>
}
