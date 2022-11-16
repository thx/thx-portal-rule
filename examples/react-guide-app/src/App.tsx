import { Divider } from '@alifd/next'
import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { IRuleMode, RuleEditor, IRuleGroupNode, IFormulaGroupNodeRelation, FORMULA_RELATION_LIST, FormulaEditor, IRuleGroupNodeRelation } from 'thx-portal-rule'
import { group2formula } from '../../../build/shared'

import './App.scss'
import { MOCK_CONTENT, MOCK_FORMULA, MOCK_MODEL_LIST, MOCK_OPERATOR_MAP } from './model'

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
  const [content, setContent] = useState<IRuleGroupNode>(MOCK_CONTENT)
  const [formula, setFormula] = useState<IRuleGroupNode>(MOCK_FORMULA)
  return <>
    <GlobalStyle />
    <div style={{ padding: 24, border: '1px solid #E6E6E6', backgroundColor: 'white' }}>
      <RuleEditor
        models={MOCK_MODEL_LIST}
        content={content}
        onChange={(nextContent) => setContent(nextContent)}
        defaultRelation={IRuleGroupNodeRelation.OR}
        // operatorMap={MOCK_OPERATOR_MAP}
        // mode={IRuleMode.LITERAL}
        // maxDepth={2}
        // modelSelectProps={{ style: { width: 200 } }}
        // fieldSelectProps={{ style: { width: 250 } }}
        // operatorSelectProps={{ style: { width: 100 } }}
      />
    </div>
    <div>{group2formula(content)}</div>
    <pre>{JSON.stringify(content, null, 2)}</pre>
    <Divider />
    <div style={{ padding: 24, border: '1px solid #E6E6E6', backgroundColor: 'white' }}>
      <FormulaEditor
        models={MOCK_MODEL_LIST}
        content={formula}
        onChange={(nextContent) => setFormula(nextContent)}
      />
    </div>
    <div>{group2formula(formula)}</div>
    <pre>{JSON.stringify(formula, null, 2)}</pre>
  </>
}
