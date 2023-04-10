import { FORMULA_RELATION_LIST, RULE_RELATION_LIST } from '../shared/index'
import { IExpressionType, IRuleConditionNode, IRuleConditionOperator, IRuleGroupNode, IRuleNodeType } from '../types/index'

// MO TODO 以下内容参考自 src/pages/sha/indicators/IndicatorTable.tsx

function literal2code (value) {
  return typeof value === 'number' ? value
    : typeof value === 'boolean' ? value
      : typeof value === 'string' ? `'${value}'`
        : value
}

// MO TODO 支持更多操作符
// MO TODO formula => expression
function condition2expression (node: IRuleConditionNode, context = '') {
  const result: string[] = []
  // 左侧 模型.字段
  const leftExpression = `${context}${node.left?.modelCode}.${node.left?.fieldCode}`
  result.push(leftExpression)
  // 中间 操作符
  const middleOperator = node.operator
    ? (
      (IRuleConditionOperator.EQUAL === node.operator && '===') ||
      (IRuleConditionOperator.NOT_EQUAL === node.operator && '!==') ||
      (IRuleConditionOperator.LESS_THAN === node.operator && '<') ||
      (IRuleConditionOperator.LESS_THAN_OR_EQUAL === node.operator && '<=') ||
      (IRuleConditionOperator.GREATER_THAN === node.operator && '>') ||
      (IRuleConditionOperator.GREATER_THAN_OR_EQUAL === node.operator && '>=') ||
      node.operator
    )
    : ''
  if (node.operator) result.push(middleOperator)
  // 右侧 模型.字段 ｜ 字面量
  const rightExpression = node.operator
    ? (
      node.right?.type === IExpressionType.LITERAL ? literal2code(node.right.value)
        : node.right?.type === IExpressionType.MODEL ? `${context}${node.right?.modelCode}.${node.right?.fieldCode}`
          : ''
    )
    : ''
  if (node.operator) result.push(rightExpression)
  return [
    '(',
    ...result,
    // leftExpression,
    // middleOperator,
    // rightExpression,
    ')'
  ].join(' ')
}

function group2expression (node: IRuleGroupNode, context = '') {
  if (!node) return ''
  const result: any[] = []
  if (node.children) {
    node.children.map(child => {
      if (child.type === IRuleNodeType.GROUP) result.push(group2expression(child, context))
      if (child.type === IRuleNodeType.CONDITION) result.push(condition2expression(child, context))
    })
  }
  return [
    '(',
    result.join(
      ' ' +
      (
        RULE_RELATION_LIST.find(item => item.value === node.relation)?.code ||
        FORMULA_RELATION_LIST.find(item => item.value === node.relation)?.code
      ) +
      ' '
    ),
    ')'
  ].join(' ')
}

export function rule2expression (node: IRuleGroupNode | IRuleConditionNode, context = '') {
  if (node.type === IRuleNodeType.GROUP) return group2expression(node, context)
  if (node.type === IRuleNodeType.CONDITION) return condition2expression(node, context)
}
