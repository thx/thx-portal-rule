import React, { useCallback, useContext } from 'react'
import { Box } from '@alifd/next'
import { RuleGroupNodeRelationColumn, RuleGroupNodeBodyColumnWrapper, RuleGroupNodeWrapper, RuleGroupNodeRelationColumnWrapper } from './RuleGroupNodeParts'
import { RuleEditorContext } from './RuleEditorContext'
import useRuleEditor from './useRuleEditor'
import { AppendChildButton, AppendSiblingButton, ExpressionTypeSelect, LiteralSetter, ModelAndField, OperatorSelect, RemoveChildButton, RuleConditionNodeWrapper } from './RuleConditionNodeParts'
import { IRuleConditionNode, IRuleGroupNode, IRuleModel, IRuleNodeType, IRuleMode } from './types'

function RuleConditionNode ({ node, depth = 0 } :{ node: IRuleConditionNode; depth?: number; }) {
  const { mode, models, maxDepth } = useContext(RuleEditorContext)
  const { left, right } = node

  return <RuleConditionNodeWrapper>
    <Box direction='row' spacing={8} wrap>
      {/* 1. 左侧 模型 + 字段 */}
      <ModelAndField models={models} expression={left} />
      {/* 2. 操作符 */}
      <OperatorSelect node={node} />
      {/* 3. 右侧 类型 */}
      {mode !== IRuleMode.LITERAL && <ExpressionTypeSelect expression={right} />}
      {/* 4.1 右侧 字面量 */}
      {right?.type === 'LITERAL' && <LiteralSetter node={node} />}
      {/* 4.2 右侧 模型 + 字段 */}
      {right?.type === 'MODEL' && <ModelAndField models={models} expression={right} />}
      {/* 5.1 增加同级 */}
      <AppendSiblingButton child={node} />
      {/* 5.2 增加子级 */}
      {(!maxDepth || depth < maxDepth) && <AppendChildButton child={node} /> }
      {/* 5.3 删除 */}
      <RemoveChildButton child={node} />
    </Box>
  </RuleConditionNodeWrapper>
}

function RuleGroupNode ({ node, depth = 0, hasBackground, hasBorder }: { node: IRuleGroupNode; depth?: number; hasBackground?: boolean; hasBorder?: boolean; }) {
  if (!node) return null
  const { children } = node
  return (
    <RuleGroupNodeWrapper hasBackground={hasBackground} hasBorder={hasBorder}>
      <Box direction='row' spacing={16} style={{}}>
        {children && children.length > 1 &&
          <RuleGroupNodeRelationColumnWrapper>
            <RuleGroupNodeRelationColumn node={node} />
          </RuleGroupNodeRelationColumnWrapper>
        }
        <RuleGroupNodeBodyColumnWrapper>
          <Box direction='column' spacing={8}>
            {(children || []).map((child, index) =>
              <div key={`${child.id}_${index}`}>
                {child.type === IRuleNodeType.GROUP && <RuleGroupNode node={child} depth={depth + 1} hasBackground />}
                {child.type === IRuleNodeType.CONDITION && <RuleConditionNode node={child} depth={depth + 1} />}
              </div>
            )}
          </Box>
        </RuleGroupNodeBodyColumnWrapper>
      </Box>
    </RuleGroupNodeWrapper>
  )
}

interface IRuleEditorProps {
  mode?: IRuleMode;
  models: IRuleModel[];
  content: IRuleGroupNode;
  onChange?: (content: IRuleGroupNode) => void;
  maxDepth?: number;
}

export default ({ mode, models: remoteModels, content: remoteContent, onChange: onRemoteChange, maxDepth } : IRuleEditorProps) => {
  const {
    content, mapped, setContent,
    appendChild, appendSibling, appendGroupWithChild,
    removeChild
  } = useRuleEditor(remoteContent)
  const onChange = useCallback(() => {
    setContent({ ...content })
    if (onRemoteChange) onRemoteChange({ ...content })
  }, [content])

  return <RuleEditorContext.Provider
    value={{
      mode,
      models: remoteModels,
      mapped,
      contentMap: mapped,
      appendChild,
      appendSibling,
      appendGroupWithChild,
      removeChild,
      onChange,
      maxDepth
    }}
  >
    <RuleGroupNode node={content} />
  </RuleEditorContext.Provider>
}
