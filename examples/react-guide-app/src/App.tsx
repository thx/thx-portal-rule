import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { IRuleMode, RuleEditor } from 'thx-portal-rule'

import './App.scss'
import { MOCK_CONTENT, MOCK_MODEL_LIST } from './model'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #FAFAFA;
  }
  #root {
    padding: var(--s-2, 8px);
  }
  .next-input.next-disabled input, .next-input.next-disabled textarea {
    cursor: not-allowed;
  }
  .GlobalStyle.styled {}
`

export default function App () {
  const [content, setContent] = useState(MOCK_CONTENT)
  return <>
    <GlobalStyle />
    <div style={{ padding: 16, border: '1px solid #E6E6E6', backgroundColor: 'white' }}>
      <RuleEditor models={MOCK_MODEL_LIST} content={content}
        onChange={(nextContent) => setContent(nextContent)}
        // mode={IRuleMode.LITERAL}
        // maxDepth={2}
      />
    </div>
    <pre>{JSON.stringify(content, null, 2)}</pre>
  </>
}
