import { FORMULA_RELATION_LIST, OPERATOR_TYPE_MAP, RULE_RELATION_LIST } from '../shared/index'
import { IExpressionType, IOperatorMap, IOperatorMapItem, IRuleConditionNode, IRuleConditionOperator, IRuleGroupNode, IRuleNodeType } from '../types/index'

// MO TODO 以下内容参考自 src/pages/sha/indicators/IndicatorTable.tsx

function literal2code (value) {
  return typeof value === 'number' ? value
    : typeof value === 'boolean' ? value
      : typeof value === 'string' ? `'${value}'`
        : value
}

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

  // 左侧字段的类型和中间的操作符，决定了表达式的生成方式
  // MO TODO 左侧字段类型
  // MO TODO 支持更多操作符
  if (OPERATOR_TYPE_MAP[node.left.fieldType || '*']) {
    const currentOperatorMap: IOperatorMap = OPERATOR_TYPE_MAP // operatorMap || OPERATOR_TYPE_MAP
    const dataSource: IOperatorMapItem[] = currentOperatorMap[node.left.fieldType || '*'] || currentOperatorMap['*']
    const operatorItem: IOperatorMapItem = dataSource.find(item => item.value === node.operator)
    if (operatorItem?.code) {
      return [
        '(',
        operatorItem.code(node, leftExpression, rightExpression),
        ')'
      ].join(' ')
    }
  }

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
