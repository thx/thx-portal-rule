import { IOperatorMap, IOperatorMapItem, IRuleConditionOperator } from '../types/index'

let __uuid__ = 0
export function uuid () {
  return Date.now() + ++__uuid__
}

/** 规则关系符集合 */
export const RULE_RELATION_LIST = [
  { label: '且', value: 'AND', code: '&&' },
  { label: '或', value: 'OR', code: '||' }
]

/** 公式关系符集合 */
export const FORMULA_RELATION_LIST = [
  { label: '加', value: 'ADD', code: '+' },
  { label: '减', value: 'SUBTRACT', code: '-' },
  { label: '乘', value: 'MULTIPLY', code: '*' },
  { label: '除', value: 'DIVIDE', code: '/' }
]

/** 操作符集合 */
export const RuleConditionOperatorMap: {
  [type: string]: IOperatorMapItem
} = {
  EQUAL: { label: '等于', value: IRuleConditionOperator.EQUAL, code: (node, left, right) => `${left} === ${right}` },
  NOT_EQUAL: { label: '不等于', value: IRuleConditionOperator.NOT_EQUAL, code: (node, left, right) => `${left} !== ${right}` },
  LESS_THAN: { label: '小于', value: IRuleConditionOperator.LESS_THAN, code: (node, left, right) => `${left} < ${right}` },
  LESS_THAN_OR_EQUAL: { label: '小于等于', value: IRuleConditionOperator.LESS_THAN_OR_EQUAL, code: (node, left, right) => `${left} <= ${right}` },
  GREATER_THAN: { label: '大于', value: IRuleConditionOperator.GREATER_THAN, code: (node, left, right) => `${left} > ${right}` },
  GREATER_THAN_OR_EQUAL: { label: '大于等于', value: IRuleConditionOperator.GREATER_THAN_OR_EQUAL, code: (node, left, right) => `${left} >= ${right}` },

  INCLUDE: { label: '包含', value: IRuleConditionOperator.INCLUDE, code: (node, left, right) => `${left}.includes(${right})` },
  NOT_INCLUDE: { label: '不包含', value: IRuleConditionOperator.NOT_INCLUDE, code: (node, left, right) => `!${left}.includes(${right})` },

  WITHIN: { label: '在之间', value: IRuleConditionOperator.WITHIN },
  NOT_WITHIN: { label: '在之外', value: IRuleConditionOperator.NOT_WITHIN },

  BEGIN_WITH: { label: '以开头', value: IRuleConditionOperator.BEGIN_WITH, code: (node, left, right) => `${left}.startsWith(${right})` },
  END_WITH: { label: '以结尾', value: IRuleConditionOperator.END_WITH, code: (node, left, right) => `${left}.endsWith(${right})` },

  MATCH: { label: '匹配', value: IRuleConditionOperator.MATCH, code: (node, left, right) => `${right}.test(${left})` },
  NOT_MATCH: { label: '不匹配', value: IRuleConditionOperator.NOT_MATCH, code: (node, left, right) => `!${right}.test(${left})` },

  ONE_OF: { label: '成员', value: IRuleConditionOperator.ONE_OF, code: (node, left, right) => `${right}.includes(${left})` },
  NOT_ONE_OF: { label: '非成员', value: IRuleConditionOperator.ONE_OF, code: (node, left, right) => `!${right}.includes(${left})` },
  MEMBERS: { label: '成员', value: IRuleConditionOperator.MEMBERS, code: (node, left, right) => `${right}.includes(${left})` },
  NOT_MEMBERS: { label: '非成员', value: IRuleConditionOperator.ONE_OF, code: (node, left, right) => `!${right}.includes(${left})` },

  CHANGE: { label: '改变', value: IRuleConditionOperator.CHANGE },
  NOT_CHANGE: { label: '不改变', value: IRuleConditionOperator.NOT_CHANGE }
}

/** 操作符集合 */
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

/** 表达式右侧类型 */
export const EXPRESSION_TYPE_DATASOURCE = [
  { label: '自身值', value: 'LITERAL' },
  { label: '模型', value: 'MODEL' }
]
