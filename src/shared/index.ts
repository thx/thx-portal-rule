import { IOperatorMap, RuleConditionOperatorMap } from '../types/index'

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