import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { Box, Button } from '@alifd/next'
import { IRuleGroupNode, IRuleNodeType, IExpressionType } from './types/index'
import { RULE_RELATION_LIST, uuid } from './shared/index'
import { RuleEditorContext } from './RuleEditorContext'
import { WidthAutoSelect } from './RuleEditorParts'

export const RelationSelect = styled(WidthAutoSelect)`
  .next-select-inner {
    background-color: var(--color-warning-2);
  }
`

// backgroundColor: `var(--color-line1-${depth % 4 + 1})`
// 分组 - 外层
interface IRuleGroupNodeWrapperProps {
  hasBackground?: boolean;
  hasBorder?: boolean;
}
export const RuleGroupNodeWrapper = styled.div < IRuleGroupNodeWrapperProps > `
  /* padding: var(--s-2) 0 var(--s-2) var(--s-2); */
  /* background-color: var(--color-white); */
  /* ${(props: any) => props.hasBorder && css`
    border: 1px solid #E6E6E6;
  `} */
  /* ${(props: any) => props.hasBackground && css`
    background-color: var(--color-line1-1);
  `} */
`

// 分组 - 关系 - 外层
export const RuleGroupNodeRelationColumnWrapper = styled.div`
  display: flex;
  /* padding: var(--s-2); */
  /* background-color: var(--color-white); */
`
// 分组 - 内容 - 外层
export const RuleGroupNodeBodyColumnWrapper = styled.div`
  flex: 1;
  /* background-color: var(--color-white); */
`

const Bracket = styled.div`
  position: relative;
  flex: auto;
  align-self: flex-end;
  width: 38.2%;
  border-left: 1px solid #E6E6E6;
  &:before {
    content: '';
    position: absolute;
    right: 0;
    width: var(--s-2, 8px);
    height: var(--s-2, 8px);
    border-radius: 50%;
    border: 1px solid rgba(31,56,88,.4);
    background-color: var(--color-white);
  }
`

const BracketTop = styled(Bracket)`
  border-top: 1px solid #E6E6E6;
  &:before {
    top: calc(var(--s-2, 8px) / -2);
  }
`

const BracketBottom = styled(Bracket)`
  border-bottom: 1px solid #E6E6E6;
  &:before {
    bottom: calc(var(--s-2, 8px) / -2);
  }
`

export function RuleGroupNodeRelationColumn ({ style, node }: { style?: any; node: IRuleGroupNode; }) {
  const { relationSelectProps, onChange } = useContext(RuleEditorContext)
  const { style: relationSelectStyle = {}, ...relationSelectExtraProps } = (typeof relationSelectProps === 'function' ? relationSelectProps(/** MO TODO 缺少参数 */) : relationSelectProps) || {}
  return <Box direction='column' align='center' style={style}>
    {/* 1 */}
    {/* <Box flex={1} style={{ width: '38.2%', borderLeft: '1px solid #E6E6E6', borderTop: '1px solid #E6E6E6', alignSelf: 'flex-end' }} /> */}
    <BracketTop />
    {/* 2 */}
    <Box direction='column' align='center' spacing={0} style={{ position: 'relative' }}>
      <RelationSelect
        defaultValue={node.relation}
        value={node.relation}
        dataSource={RULE_RELATION_LIST}
        style={{ width: 60, ...relationSelectStyle }}
        {...relationSelectExtraProps}
        onChange={(value, action, item) => {
          node.relation = value
          onChange()
        }}
      />
      <Button
        onClick={() => {
          node.children.push({
            id: uuid(),
            type: IRuleNodeType.CONDITION,
            left: { type: IExpressionType.MODEL },
            right: { type: IExpressionType.LITERAL, value: '' },
            operator: undefined // IRuleConditionOperator.EQUAL
          })
          onChange()
        }}
        size='small'
        style={{
          position: 'absolute',
          left: 'var(--s-1, 4px)',
          top: 'var(--s-9, 36px)',
          width: 'var(--s-6, 24px)',
          height: 'var(--s-6, 24px)',
          borderRadius: 100
        }}
      >+</Button>
    </Box>
    {/* 3 */}
    {/* <Box flex={1} style={{ width: '38.2%', borderLeft: '1px solid #E6E6E6', borderBottom: '1px solid #E6E6E6', alignSelf: 'flex-end' }} /> */}
    <BracketBottom />
  </Box>
}
