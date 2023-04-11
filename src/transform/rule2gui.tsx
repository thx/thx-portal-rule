import React from 'react'
import { Box, Tag } from '@alifd/next'
import { IExpressionType, IRuleConditionNode, IRuleGroupNode, IRuleNodeType } from '../types/index'
import { FORMULA_RELATION_LIST, RuleConditionOperatorMap, RULE_RELATION_LIST } from '../shared/index'

function condition2gui (node: IRuleConditionNode) {
  return <Box direction='row' spacing={4} wrap>
    <Tag>
      <Box direction='row' align='center' spacing={4}>
        <span>{node.left?.modelName || '-'}</span>
        <span>/</span>
        {/* <span>#{node.left?.modelId}</span> */}
        <span>{node.left?.fieldName || '-'}</span>
        {/* <span>#{node.left?.fieldId}</span> */}
      </Box>

    </Tag>
    <Tag color='var(--color-notice-1)' style={{ color: '#333' }}>
      <Box direction='row' align='center' spacing={4}>
        <span>{RuleConditionOperatorMap[node.operator]?.label}</span>
        <span>{node.operator}</span>
      </Box>
    </Tag>
    <Tag>
      {node.right?.type === IExpressionType.LITERAL &&
        <Box direction='row' align='center' spacing={4}>
          <span>{JSON.stringify(node.right.value)}</span>
        </Box>
      }
      {node.right?.type === IExpressionType.MODEL &&
        <Box direction='row' align='center' spacing={4}>
          <span>{node.right?.modelName || '-'}</span>
          <span>/</span>
          <span>{node.right?.fieldName || '-'}</span>
        </Box>
      }
    </Tag>
  </Box>
}

function group2gui (node: IRuleGroupNode) {
  const result: any[] = []
  if (node.children) {
    node.children.map(child => {
      if (child.type === IRuleNodeType.GROUP) result.push(group2gui(child))
      if (child.type === IRuleNodeType.CONDITION) result.push(condition2gui(child))
    })
  }
  return <Box direction='column' spacing={4}>
    <div>(</div>
    {result.map((item, index, array) => {
      const relation = [...RULE_RELATION_LIST, ...FORMULA_RELATION_LIST].find(item => item.value === node.relation)
      return <Box key={index} direction='column' spacing={4} style={{ paddingLeft: 16 }}>
        <div>{item}</div>
        {index < array.length - 1 && <div>
          <Tag type='primary' color='var(--color-warning-2)' style={{ color: '#333' }}>{relation?.label}</Tag>
        </div>}
      </Box>
    })}
    <div>)</div>
  </Box>
}

export function rule2gui (node: IRuleGroupNode | IRuleConditionNode, result: { [key: string]: any; } = {}) {
  if (node.type === IRuleNodeType.GROUP) return group2gui(node)
  if (node.type === IRuleNodeType.CONDITION) return condition2gui(node)
}
