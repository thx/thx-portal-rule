import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Button, Icon, Input } from '@alifd/next'
import { EXPRESSION_TYPE_DATASOURCE, OPERATOR_TYPE_MAP, uuid } from './shared'
import { RuleEditorContext, tree2map, ModelAndField, GroupNodeRelationColumn, WidthAutoSelect, GroupNodeBodyColumn } from './RuleEditorParts'
import { IRuleConditionNode, IRuleGroupNode, IRelation, IRuleModel } from './types'
// Program Expression left right operator
// Rule / condition

const ConditionNodeWrapper = styled.div`
  padding: var(--s-2);
  background-color: var(--color-fill1-1);
  &:hover {
    background-color: var(--color-fill1-4);
  }
`

function RuleConditionNode ({ node } :{ node: IRuleConditionNode }) {
  const { models, mapped, onChange } = useContext(RuleEditorContext)
  const { left, right, operator } = node

  return <ConditionNodeWrapper>
    <Box direction='row' spacing={8}>
      {/* <div>{expression.id}</div> */}
      {/* 左侧 模型 + 字段 */}
      <ModelAndField models={models} expression={left} />
      {/* 操作符 */}
      <WidthAutoSelect
        defaultValue={operator}
        dataSource={OPERATOR_TYPE_MAP['*']}
        onChange={(value, action, item) => {
          node.operator = value
          onChange()
        }}
        style={{ width: 90 }}
      />
      {/* 右侧 类型 */}
      <WidthAutoSelect
        defaultValue={operator}
        value={right?.type}
        dataSource={EXPRESSION_TYPE_DATASOURCE}
        onChange={(value, action, item) => {
          right.type = value
          onChange()
        }}
        style={{ width: 90 }}
      />
      {/* 右侧 字面量 */}
      {right?.type === 'LITERAL' &&
        <Input defaultValue={right.value} style={{ width: 120 }}
          onChange={(value) => {
            right.value = value
            onChange()
          }}
        />
      }
      {/* 右侧 模型 + 字段 */}
      {right?.type === 'MODEL' && (
        <ModelAndField models={models} expression={right} />
      )}
      <Button
        onClick={() => {
          const child = node
          const parent = mapped[mapped[child.id].parentId]
          if (parent.type === 'GROUP_EXPRESSION') {
            const childIndex = parent.children.indexOf(node)
            parent.children.splice(childIndex + 1, 0, {
              id: uuid(),
              type: 'CONDITION_EXPRESSION',
              left: { type: 'MODEL' },
              right: { type: 'LITERAL', value: '' },
              operator: undefined
            })
          }
          onChange()
        }}
      ><Icon type='add' /></Button>
      <Button
        onClick={() => {
          const child = node
          const parent = mapped[mapped[child.id].parentId]
          if (parent.type === 'GROUP_EXPRESSION') {
            const childIndex = parent.children.indexOf(child)
            const nextGroup: IRuleGroupNode = {
              id: uuid(),
              type: 'GROUP_EXPRESSION',
              relation: IRelation.AND,
              children: []
            }
            child.parentId = nextGroup.id
            nextGroup.children.push(
              child,
              {
                id: uuid(),
                type: 'CONDITION_EXPRESSION',
                left: { type: 'MODEL' },
                right: { type: 'LITERAL', value: '' },
                operator: undefined
              }
            )
            parent.children.splice(childIndex, 1, nextGroup)
          }
          onChange()
        }}
      ><Icon type='toggle-right' /></Button>
      <Button
        onClick={() => {
          const child = node
          const parent = mapped[mapped[child.id].parentId]
          if (!parent) return
          if (parent.type === 'GROUP_EXPRESSION') {
            if (parent.children.length === 1) return
            const childIndex = parent.children.indexOf(child)
            parent.children.splice(childIndex, 1)
            onChange()

            if (parent.children.length === 1) {
              const grand = mapped[parent.parentId]
              if (!grand) return
              if (grand.type === 'GROUP_EXPRESSION') {
                const parentIndex = grand.children.indexOf(parent)
                child.parentId = grand.id
                grand.children.splice(parentIndex, 1, parent.children[0])
                onChange()
              }
            }
          }
        }}
      ><Icon type='ashbin' /></Button>
    </Box>
  </ConditionNodeWrapper>
}

function RuleGroupNode ({ node, depth = 0 }: { node: IRuleGroupNode; depth?: number; }) {
  if (!node) return null
  const { children } = node
  return (
    <Box direction='row' spacing={16} style={{
      padding: 'var(--s-2)',
      border: '1px solid #E6E6E6',
      backgroundColor: `var(--color-line1-${depth % 4 + 1})`
    }}>
      {children && children.length > 1 &&
        <GroupNodeRelationColumn node={node} />
      }
      <GroupNodeBodyColumn>
        <Box direction='column' spacing={8}>
          {(children || []).map((child, index) =>
            <div key={`${child.id}_${index}`}>
              {child.type === 'GROUP_EXPRESSION' && <RuleGroupNode node={child} depth={depth + 1} />}
              {child.type === 'CONDITION_EXPRESSION' && <RuleConditionNode node={child} />}
            </div>
          )}
        </Box>
      </GroupNodeBodyColumn>
    </Box>
  )
}

function fixContent (content: IRuleGroupNode) {
  let changed = false
  if (!content) {
    content = {
      id: uuid(),
      type: 'GROUP_EXPRESSION'
    }
    changed = true
  }
  if (!content.id) {
    content.id = uuid()
    changed = true
  }
  if (!content.type) {
    content.type = 'GROUP_EXPRESSION'
    changed = true
  }
  if (!content.relation) {
    content.relation = IRelation.AND
    changed = true
  }
  if (!content.children || !content.children.length) {
    content.children = [
      {
        id: uuid(),
        type: 'CONDITION_EXPRESSION',
        left: {
          type: 'MODEL'
        },
        right: {
          type: 'LITERAL'
        }
      }
    ]
    changed = true
  }
  return { content, changed }
}

export default ({ models: remoteModels, content: remoteContent, onChange } : { models: IRuleModel[]; content: IRuleGroupNode; onChange?: (content: IRuleGroupNode) => void; }) => {
  const [content, setContent] = useState<IRuleGroupNode>(remoteContent)
  useEffect(() => {
    const { content: nextContent, changed } = fixContent(content)
    if (changed) setContent({ ...nextContent })
  }, [])
  const [mapped, setMapped] = useState<{ [id: string]: IRuleConditionNode | IRuleGroupNode }>({})
  useEffect(() => {
    if (!content) return
    setMapped(tree2map(content))
  }, [content])

  return <RuleEditorContext.Provider
    value={{
      models: remoteModels,
      mapped,
      onChange: () => {
        setContent({ ...content })
        if (onChange) onChange({ ...content })
      }
    }}
  >
    <RuleGroupNode node={content} />
  </RuleEditorContext.Provider>
}
