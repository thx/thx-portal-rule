import { useCallback, useEffect, useState } from 'react'
import { uuid } from './shared/index'
import { tree2map } from './transform/tree2map'
import { IRuleConditionNode, IRuleGroupNode, IRuleGroupNodeRelation, IRuleNodeType, IExpressionType, IFormulaGroupNodeRelation } from './types'

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

export default function useRuleEditor (remoteContent: IRuleGroupNode, defaultRelation?: IRuleGroupNodeRelation | IFormulaGroupNodeRelation) {
  const [content, setContent] = useState<IRuleGroupNode>(remoteContent)
  useEffect(() => {
    const { content: nextContent, changed } = fixContent(content, defaultRelation)
    if (changed) setContent({ ...nextContent })
  }, [])
  const [mapped, setMapped] = useState<{ [id: string]: IRuleConditionNode | IRuleGroupNode }>({})
  useEffect(() => {
    if (!content) return
    setMapped(tree2map(content))
  }, [content])

  const appendChild = useCallback((parent: IRuleGroupNode) => {
    parent.children.push({
      id: uuid(),
      type: IRuleNodeType.CONDITION,
      left: { type: IExpressionType.MODEL },
      right: { type: IExpressionType.LITERAL, value: '' },
      operator: undefined // IRuleConditionOperator.EQUAL
    })
    // onChange() // MO FIXED 不在这里触发
  }, [mapped])

  const appendSibling = useCallback((child: IRuleConditionNode) => {
    const parent = mapped[mapped[child.id].parentId]
    if (parent.type === IRuleNodeType.GROUP) {
      const childIndex = parent.children.indexOf(child)
      parent.children.splice(childIndex + 1, 0, {
        id: uuid(),
        type: IRuleNodeType.CONDITION,
        left: { type: IExpressionType.MODEL },
        right: { type: IExpressionType.LITERAL, value: '' },
        operator: undefined
      })
    }
    // onChange() // MO FIXED 不在这里触发
  }, [mapped])

  const appendGroupWithChild = useCallback((child: IRuleConditionNode) => {
    const parent = mapped[mapped[child.id].parentId]
    if (parent.type === IRuleNodeType.GROUP) {
      const childIndex = parent.children.indexOf(child)
      const nextGroup: IRuleGroupNode = {
        id: uuid(),
        type: IRuleNodeType.GROUP,
        relation: defaultRelation || IRuleGroupNodeRelation.AND,
        children: []
      }
      child.parentId = nextGroup.id
      nextGroup.children.push(
        child,
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: { type: IExpressionType.MODEL },
          right: { type: IExpressionType.LITERAL, value: '' },
          operator: undefined
        }
      )
      parent.children.splice(childIndex, 1, nextGroup)
    }
    // onChange() // MO FIXED 不在这里触发
  }, [mapped])

  const removeChild = useCallback((child: IRuleConditionNode) => {
    const parent = mapped[mapped[child.id].parentId]
    if (!parent) return
    if (parent.type === IRuleNodeType.GROUP) {
      if (parent.children.length === 1) return
      const childIndex = parent.children.indexOf(child)
      parent.children.splice(childIndex, 1)
      // onChange()

      if (parent.children.length === 1) {
        const grand = mapped[parent.parentId]
        if (!grand) return
        if (grand.type === IRuleNodeType.GROUP) {
          const parentIndex = grand.children.indexOf(parent)
          child.parentId = grand.id
          grand.children.splice(parentIndex, 1, parent.children[0])
          // onChange() // MO TODO
        }
      }
    }
  }, [mapped])

  return {
    content,
    mapped,
    setContent,
    appendChild,
    appendSibling,
    appendGroupWithChild,
    removeChild
  }
}
