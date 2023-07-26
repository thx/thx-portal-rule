import { uuid } from '../shared/index'
import { IRuleGroupNode, IRuleConditionNode, IRuleNodeType } from '../types/index'

export function tree2map (node: IRuleGroupNode, mapped:{ [id: string]: IRuleConditionNode | IRuleGroupNode } = {}) {
  if (!node) return mapped
  if (!node.id) node.id = uuid()
  mapped[node.id] = node
  if (node.children) {
    node.children.forEach(child => {
      if (!child.id) child.id = uuid()
      child.parentId = node.id
      mapped[child.id] = child
      if (child.type === IRuleNodeType.GROUP) {
        tree2map(child, mapped)
      }
    })
  }
  return mapped
}
