import { IRuleGroupNode, IRuleConditionNode, IRuleGroupNodeRelation, IRuleNodeType, IExpressionType, IFormulaGroupNodeRelation } from './types/index'
import { uuid } from './shared/index'
import styled from 'styled-components'
import { Select } from '@alifd/next'

export function fixContent (content: IRuleGroupNode, defaultRelation: IRuleGroupNodeRelation | IFormulaGroupNodeRelation) {
  let changed = false
  if (!content) {
    content = {
      id: uuid(),
      type: IRuleNodeType.GROUP
    }
    changed = true
  }
  if (!content.id) {
    content.id = uuid()
    changed = true
  }
  if (!content.type) {
    content.type = IRuleNodeType.GROUP
    changed = true
  }
  if (!content.relation) {
    // MO FIXED defaultGroupRelation => defaultRelation
    // 似乎应该是 defaultRuleGroupNodeRelation，含义更完整，但是会增加使用成本。
    content.relation = defaultRelation || IRuleGroupNodeRelation.AND
    changed = true
  }
  if (!content.children || !content.children.length) {
    content.children = [
      {
        id: uuid(),
        type: IRuleNodeType.CONDITION,
        left: {
          type: IExpressionType.MODEL
        },
        right: {
          type: IExpressionType.LITERAL
        }
      }
    ]
    changed = true
  }
  return { content, changed }
}

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

export const WidthAutoSelect = styled(Select)`
  min-width: auto;
  .next-select-inner {
    min-width: auto;
  }
`
