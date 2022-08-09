import { RuleConditionOperatorMap } from './types/index'

let __uuid__ = 0
export function uuid () {
  return Date.now() + ++__uuid__
}

export const OPERATOR_TYPE_MAP = {
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
