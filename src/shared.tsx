import React from 'react'
import { Box, Tag } from '@alifd/next'
import { IOperatorMap, IRuleConditionNode, IRuleGroupNode, IRuleNodeType, RuleConditionOperatorMap } from './types/index'

let __uuid__ = 0
export function uuid () {
  return Date.now() + ++__uuid__
}

export const RULE_RELATION_LIST = [
  { label: '且', value: 'AND', code: '&&' },
  { label: '或', value: 'OR', code: '||' }
]

export const FORMULA_RELATION_LIST = [
  { label: '加', value: 'ADD', code: '+' },
  { label: '减', value: 'SUBTRACT', code: '-' },
  { label: '乘', value: 'MULTIPLY', code: '*' },
  { label: '除', value: 'DIVIDE', code: '/' }
]

export const OPERATOR_TYPE_MAP: IOperatorMap = {
  '*': [
    RuleConditionOperatorMap.EQUAL,
    RuleConditionOperatorMap.NOT_EQUAL,
    RuleConditionOperatorMap.LESS_THAN,
    RuleConditionOperatorMap.LESS_THAN_OR_EQUAL,
    RuleConditionOperatorMap.GREATER_THAN,
    RuleConditionOperatorMap.GREATER_THAN_OR_EQUAL,
    RuleConditionOperatorMap.INCLUDE,
    RuleConditionOperatorMap.NOT_INCLUDE,
    RuleConditionOperatorMap.WITHIN,
    RuleConditionOperatorMap.NOT_WITHIN,
    RuleConditionOperatorMap.BEGIN_WITH,
    RuleConditionOperatorMap.END_WITH
  ],
  'BOOLEAN': [
    RuleConditionOperatorMap.EQUAL,
    RuleConditionOperatorMap.NOT_EQUAL
  ],
  'NUMBER': [
    RuleConditionOperatorMap.EQUAL,
    RuleConditionOperatorMap.NOT_EQUAL,
    RuleConditionOperatorMap.LESS_THAN,
    RuleConditionOperatorMap.LESS_THAN_OR_EQUAL,
    RuleConditionOperatorMap.GREATER_THAN,
    RuleConditionOperatorMap.GREATER_THAN_OR_EQUAL
  ],
  'STRING': [
    RuleConditionOperatorMap.EQUAL,
    RuleConditionOperatorMap.NOT_EQUAL,
    RuleConditionOperatorMap.INCLUDE,
    RuleConditionOperatorMap.NOT_INCLUDE,
    RuleConditionOperatorMap.BEGIN_WITH,
    RuleConditionOperatorMap.END_WITH
  ],
  'DATE': [
    RuleConditionOperatorMap.EQUAL,
    RuleConditionOperatorMap.NOT_EQUAL,
    RuleConditionOperatorMap.LESS_THAN,
    RuleConditionOperatorMap.LESS_THAN_OR_EQUAL,
    RuleConditionOperatorMap.GREATER_THAN,
    RuleConditionOperatorMap.GREATER_THAN_OR_EQUAL
  ],
  'DATETIME': [
    RuleConditionOperatorMap.EQUAL,
    RuleConditionOperatorMap.NOT_EQUAL,
    RuleConditionOperatorMap.LESS_THAN,
    RuleConditionOperatorMap.LESS_THAN_OR_EQUAL,
    RuleConditionOperatorMap.GREATER_THAN,
    RuleConditionOperatorMap.GREATER_THAN_OR_EQUAL
  ],
  'COLLECTION': [
    RuleConditionOperatorMap.INCLUDE,
    RuleConditionOperatorMap.NOT_INCLUDE
  ]
}

export const EXPRESSION_TYPE_DATASOURCE = [
  { label: '自身值', value: 'LITERAL' },
  { label: '模型', value: 'MODEL' }
]

export function condition2formula (node: IRuleConditionNode) {
  return <Tag>
    <Box direction='row' align='center' spacing={4}>
      {/* {node.left?.modelCode === 'characteristics' && <CharacteristicIcon />} */}
      {/* {node.left?.modelCode === 'indicators' && <IndicatorIcon />} */}
      <span>{node.left?.fieldName}</span>
      <span>#{node.left?.fieldId}</span>
    </Box>
  </Tag>
}

export function group2formula (node: IRuleGroupNode) {
  const result: any[] = []
  if (node.children) {
    node.children.map(child => {
      if (child.type === IRuleNodeType.GROUP) result.push(group2formula(child))
      if (child.type === IRuleNodeType.CONDITION) result.push(condition2formula(child))
    })
  }
  return <Box direction='row' align='center' spacing={4} wrap>
    <div>(</div>
    {result.map((item, index, array) => {
      const relation = [...RULE_RELATION_LIST, ...FORMULA_RELATION_LIST].find(item => item.value === node.relation)
      return <Box key={index} direction='row' align='center' spacing={4} wrap>
        <div>{item}</div>
        {index < array.length - 1 && <div>
          <Tag type='primary'>{relation?.code}</Tag>
        </div>}
      </Box>
    })}
    <div>)</div>
  </Box>
}
