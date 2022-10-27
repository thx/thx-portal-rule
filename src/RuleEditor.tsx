import React, { useCallback, useContext } from 'react'
import { Box } from '@alifd/next'
import { RuleGroupNodeRelationColumn, RuleGroupNodeBodyColumnWrapper, RuleGroupNodeWrapper, RuleGroupNodeRelationColumnWrapper } from './RuleGroupNodeParts'
import { IFieldSelectProps, ILiteralSetterProps, IModelSelectProps, IOperatorSelectProps, IRelationSelectProps, ITypeSelectProps, RuleEditorContext } from './RuleEditorContext'
import useRuleEditor from './useRuleEditor'
import { AppendChildButton, AppendSiblingButton, ExpressionTypeSelect, LiteralSetter, ModelAndField, OperatorSelect, RemoveChildButton, RuleConditionNodeWrapper } from './RuleConditionNodeParts'
import { IRuleConditionNode, IRuleGroupNode, IRuleModel, IRuleNodeType, IRuleMode, IOperatorMap, IRuleGroupNodeRelation, IFormulaGroupNodeRelation } from './types'

function RuleConditionNode ({ node, depth = 0 } :{ node: IRuleConditionNode; depth?: number; }) {
  const { mode, models, maxDepth } = useContext(RuleEditorContext)
  const { left, right } = node

  return <RuleConditionNodeWrapper>
    <Box direction='row' spacing={8} wrap>
      {/* 1 左侧 模型 + 字段 */}
      <ModelAndField models={models} expression={left} position='left' />
      {/* 2 操作符 */}
      <OperatorSelect node={node} />
      {/* 3 右侧 类型 */}
      {mode !== IRuleMode.LITERAL && <ExpressionTypeSelect expression={right} />}
      {/* 4.1 右侧 字面量 */}
      {right?.type === 'LITERAL' && <LiteralSetter node={node} />}
      {/* 4.2 右侧 模型 + 字段 */}
      {right?.type === 'MODEL' && <ModelAndField models={models} expression={right} position='right' />}
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

export interface IRuleEditorProps {
  /** 模式，默认为 MODEL，如果传入 LITERAL，则表达式右侧只有字面量。 */
  mode?: IRuleMode;
  /** 模型选择器的可选值。 */
  models: IRuleModel[];
  /** 值。 */
  content: IRuleGroupNode;
  /** 当值发生改变时被触发。 */
  onChange?: (content: IRuleGroupNode) => void;
  /** 自定义可选的操作符，格式参见 OPERATOR_TYPE_MAP。 */
  operatorMap?: IOperatorMap;
  /** 表达式的最大嵌套深度，默认不限制。 */
  maxDepth?: number;
  /** 表达式之间的默认关系。 */
  defaultRelation?: IRuleGroupNodeRelation | IFormulaGroupNodeRelation;
  /** 关系选择器属性 */
  relationSelectProps?: IRelationSelectProps;
  /** 模型选择器属性 */
  modelSelectProps?: IModelSelectProps;
  /** 字段选择器属性 */
  fieldSelectProps?: IFieldSelectProps;
  /** 操作符选择期属性 */
  operatorSelectProps?: IOperatorSelectProps;
  /** 右侧类型选择器属性 */
  typeSelectProps?: ITypeSelectProps;
  /** 字面量设置器属性 */
  literalSetterProps?: ILiteralSetterProps;
}

// MO TODO disabled readonly
// MO TODO highlight

export default ({
  mode, models: remoteModels, content: remoteContent, onChange: onRemoteChange,
  maxDepth,
  operatorMap: remoteOperatorMap,
  modelSelectProps, fieldSelectProps, operatorSelectProps, typeSelectProps, literalSetterProps,
  relationSelectProps, defaultRelation
} : IRuleEditorProps) => {
  const {
    content, mapped, setContent,
    appendChild, appendSibling, appendGroupWithChild,
    removeChild
  } = useRuleEditor(remoteContent, defaultRelation)

  const onChange = useCallback(() => {
    setContent({ ...content })
    if (onRemoteChange) onRemoteChange({ ...content })
  }, [content])

  return <RuleEditorContext.Provider
    value={{
      //
      mode,
      models: remoteModels,
      mapped,
      contentMap: mapped,
      //
      appendChild,
      appendSibling,
      appendGroupWithChild,
      removeChild,
      //
      onChange,
      //
      maxDepth,
      // 自定义
      operatorMap: remoteOperatorMap,
      modelSelectProps,
      fieldSelectProps,
      operatorSelectProps,
      typeSelectProps,
      literalSetterProps,
      // 自定义
      relationSelectProps,
      defaultRelation
    }}
  >
    <RuleGroupNode node={content} />
  </RuleEditorContext.Provider>
}
