import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { IRuleMode, RuleEditor, IRelation } from 'thx-portal-rule'

import './App.scss'
import { MOCK_CONTENT, MOCK_MODEL_LIST, MOCK_OPERATOR_MAP } from './model'

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
    <div style={{ padding: 24, border: '1px solid #E6E6E6', backgroundColor: 'white' }}>
      <RuleEditor
        models={MOCK_MODEL_LIST}
        content={content}
        onChange={(nextContent) => setContent(nextContent)}
        // defaultRelation={IRelation.OR}
        // operatorMap={MOCK_OPERATOR_MAP}
        // mode={IRuleMode.LITERAL}
        // maxDepth={2}
        // modelSelectProps={{ style: { width: 200 } }}
        // fieldSelectProps={{ style: { width: 250 } }}
        // operatorSelectProps={{ style: { width: 100 } }}
      />
    </div>
    <pre>{JSON.stringify(content, null, 2)}</pre>
  </>
}
