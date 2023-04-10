import { IExpressionType, IRuleConditionNode, IRuleGroupNode, IRuleNodeType } from '../types/index'

function condition2data (node: IRuleConditionNode, result: { [key: string]: any; } = {}) {
  if (node.left?.modelCode) {
    result[node.left?.modelCode] = result[node.left?.modelCode] || {}
    if (node.left?.fieldCode) {
      if (!(node.left?.fieldCode in result[node.left?.modelCode])) {
        result[node.left?.modelCode][node.left?.fieldCode] = ''
      }
      if (node.right?.type === IExpressionType.LITERAL) {
        result[node.left?.modelCode][node.left?.fieldCode] = node.right.value
      }
    }
  }
  if (node.right?.type === IExpressionType.MODEL) {
    if (node.right?.modelCode) {
      result[node.right?.modelCode] = result[node.right?.modelCode] || {}
      if (node.right?.fieldCode) {
        if (!(node.right?.fieldCode in result[node.right?.modelCode])) {
          result[node.right?.modelCode][node.right?.fieldCode] = ''
        }
      }
    }
  }

  return result
}

function group2data (node: IRuleGroupNode, result: { [key: string]: any; } = {}) {
  if (!node) return result
  result = result || {}
  if (node.children) {
    node.children.map(child => {
      if (child.type === IRuleNodeType.GROUP) group2data(child, result)
      if (child.type === IRuleNodeType.CONDITION) condition2data(child, result)
    })
  }
  return result
}

export function rule2data (node: IRuleGroupNode | IRuleConditionNode, result: { [key: string]: any; } = {}) {
  if (node.type === IRuleNodeType.GROUP) return group2data(node, result)
  if (node.type === IRuleNodeType.CONDITION) return condition2data(node, result)
}
