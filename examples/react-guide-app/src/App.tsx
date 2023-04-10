import React, { useCallback, useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Box, Divider, Input } from '@alifd/next'
import { RuleEditor, IRuleGroupNode, FormulaEditor, IRuleGroupNodeRelation, rule2expression, rule2function, rule2data, rule2gui } from 'thx-portal-rule'
import { MOCK_CONTENT, MOCK_CONTENT_SIMPLE_1, MOCK_CONTENT_SIMPLE_2, MOCK_CONTENT_SIMPLE_3, MOCK_FORMULA, MOCK_FORMULA_SIMPLE_1, MOCK_MODEL_LIST } from './model'
import './App.scss'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #FAFAFA;
  }
  #root {
    padding: var(--s-4, 16px);
  }
  .next-input.next-disabled input, .next-input.next-disabled textarea {
    cursor: not-allowed;
  }
  .GlobalStyle.styled {}
`

const EditorWrapper = styled.div`
  padding: var(--s-6);
  border: 1px solid #E6E6E6;
  border-radius: var(--s-1, 4px);
  background-color: white;
`

const PreWrapper = styled.div`
  flex: auto;
  border: 1px solid #E6E6E6;
  border-radius: var(--s-1, 4px);
  background-color: white;
  pre {
    margin: 0;
    padding: 16px;
    max-height: 280px;
    overflow: auto;
    white-space: break-spaces;
  }
`
function DataTextArea ({ value, onChange }) {
  const [draft, setDraft] = useState<string>(JSON.stringify(value, null, 2))
  useEffect(() => {
    setDraft(JSON.stringify(value, null, 2))
  }, [JSON.stringify(value)])
  const [error, setError] = useState<Error>()
  return <>
    <Input.TextArea
      value={draft}
      onChange={(value) => {
        setDraft(value)
        try {
          onChange(JSON.parse(value))
          setError(undefined)
        } catch (error) {
          setError(error)
          console.warn(error)
        }
      }}
      style={{ flex: 'auto', width: '100%', fontFamily: 'monospace' }}
      autoHeight
      state={error ? 'error' : undefined}
      spellCheck={false}
    />
    <div style={{ color: 'var(--form-error-color, #FF3000)' }}>{error?.message}</div>
  </>
}

function useExample (rule: IRuleGroupNode) {
  const [expression, setExpression] = useState<string>(rule2expression(rule))
  useEffect(() => {
    setExpression(rule2expression(rule))
  }, [rule])

  const fn = useCallback(rule2function(rule), [rule])

  const [context, setContext] = useState<{ [key: string]: string; }>(rule2data(rule))
  useEffect(() => {
    setContext(rule2data(rule, context)) // 保留上一次数据
  }, [rule])

  const [result, setResult] = useState<any>(fn(context))
  useEffect(() => {
    setResult(fn(context))
  }, [fn, context])

  useEffect(() => {
    console.log('context', context)
  }, [context])

  return { expression, fn, context, setContext, result }
}

function What ({ content, ...extra }: { content: IRuleGroupNode }) {
  const { expression, fn, context, setContext, result } = useExample(content)
  return <Box {...extra} direction='column' spacing={16}>
    <Box direction='row' spacing={16}>
      <Box flex={[0, 1, '50%']} style={{ overflow: 'auto' }} spacing={4}>
        <b>表达式串</b>
        <PreWrapper>
          <pre style={{ whiteSpace: 'break-spaces' }}>{expression}</pre>
        </PreWrapper>
      </Box>
      <Box flex={[0, 1, '50%']} style={{ overflow: 'auto' }} spacing={4} hidden>
        <b>执行函数</b>
        <PreWrapper>
          <pre style={{ whiteSpace: 'break-spaces' }}>{fn.toString()}</pre>
        </PreWrapper>
      </Box>
      <Box flex={[0, 1, '50%']} style={{ overflow: 'auto' }} spacing={4}>
        <b>模拟数据</b>
        <DataTextArea value={context} onChange={(value) => setContext(value)} />
        {/* <PreWrapper>
          <pre style={{ whiteSpace: 'break-spaces' }}>{JSON.stringify(context, null, 2)}</pre>
        </PreWrapper> */}
      </Box>
      <Box flex={[0, 1, '50%']} style={{ overflow: 'auto' }} spacing={4}>
        <b>执行结果</b>
        <PreWrapper>
          <pre style={{ whiteSpace: 'break-spaces' }}>{JSON.stringify(result)}</pre>
        </PreWrapper>
      </Box>
    </Box>
    <Box direction='row' spacing={16}>
      <Box flex={[0, 1, '50%']} style={{ overflow: 'auto' }} spacing={4}>
        <b>规则 JSON</b>
        <PreWrapper>
          <pre style={{ whiteSpace: 'break-spaces' }}>{JSON.stringify(content, null, 2)}</pre>
        </PreWrapper>
      </Box>
      <Box flex={[0, 1, '50%']} style={{ overflow: 'auto' }} spacing={4}>
        <b>表达式图</b>
        <PreWrapper>
          <pre>
            {rule2gui(content)}
          </pre>
        </PreWrapper>
      </Box>
    </Box>
  </Box>
}

function RuleExamples ({ value }: { value: IRuleGroupNode }) {
  const [ content, setContent ] = useState<IRuleGroupNode>(value)
  return <Box spacing={16}>
    <EditorWrapper>
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
    </EditorWrapper>
    <What content={content} />
  </Box>
}

function FormulaExamples ({ value }: { value: IRuleGroupNode; }) {
  const [content, setContent] = useState<IRuleGroupNode>(value)
  return <Box spacing={16}>
    <EditorWrapper>
      <FormulaEditor
        models={MOCK_MODEL_LIST}
        content={content}
        onChange={(nextContent) => setContent(nextContent)}
      />
    </EditorWrapper>
    <What content={content} />
  </Box>
}

const AnchroWrapper = styled.div`
  position: fixed;
  right: var(--s-4);
  top: var(--s-6);
  width: 140px;
`

export default function App () {
  return <>
    <GlobalStyle />
    <Box direction='row' spacing={16}>
      <Box>
        <a name='简单规则 1' />
        <h1>简单规则 1：模型 + 字面量</h1>
        <RuleExamples value={MOCK_CONTENT_SIMPLE_1} />
        <a name='简单规则 2' />
        <h1>简单规则 2：模型 + 模型</h1>
        <RuleExamples value={MOCK_CONTENT_SIMPLE_2} />
        <a name='简单规则 3' />
        <h1>简单规则 3：模型 + 字面量</h1>
        <RuleExamples value={MOCK_CONTENT_SIMPLE_3} />
        <a name='复杂规则 1' />
        <h1>复杂规则 1</h1>
        <RuleExamples value={MOCK_CONTENT} />
        <Divider />

        <a name='简单公式 1' />
        <h1>简单公式 1</h1>
        <FormulaExamples value={MOCK_FORMULA_SIMPLE_1} />

        <a name='复杂公式 1' />
        <h1>复杂公式 1</h1>
        <FormulaExamples value={MOCK_FORMULA} />
      </Box>
      <Box flex={[0, 0, 140]} style={{ position: 'relative' }}>
        <AnchroWrapper>
          <Box direction='column' spacing={8}>
            <a href='#简单规则 1'>简单规则 1</a>
            <a href='#简单规则 2'>简单规则 2</a>
            <a href='#简单规则 3'>简单规则 3</a>
            <a href='#复杂规则 1'>复杂规则 1</a>
            <hr />
            <a href='#简单公式 1'>简单公式 1</a>
            <a href='#复杂公式 1'>复杂公式 1</a>
          </Box>
        </AnchroWrapper>
      </Box>
    </Box>
  </>
}
