import styled, { css } from 'styled-components'
import { Box, Button, DatePicker, Input, NumberPicker, Range, Select, Switch, TimePicker } from '@alifd/next'
import { IRuleGroupNode, IRuleConditionNode, IRuleField, IMemberExpression, IRuleModel, IRelation } from './types/index'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { uuid } from './shared'
import moment from 'moment'
import { RangeProps } from '@alifd/next/types/range'
import { InputProps } from '@alifd/next/types/input'
import { DatePickerProps, MonthPickerProps, RangePickerProps, YearPickerProps } from '@alifd/next/types/date-picker'
import { NumberPickerProps } from '@alifd/next/types/number-picker'
moment.locale('zh-cn')

export function fixContent (content: IRuleGroupNode) {
  let changed = false
  if (!content) {
    content = {
      id: uuid(),
      type: 'GROUP_EXPRESSION'
    }
    changed = true
  }
  if (!content.id) {
    content.id = uuid()
    changed = true
  }
  if (!content.type) {
    content.type = 'GROUP_EXPRESSION'
    changed = true
  }
  if (!content.relation) {
    content.relation = IRelation.AND
    changed = true
  }
  if (!content.children || !content.children.length) {
    content.children = [
      {
        id: uuid(),
        type: 'CONDITION_EXPRESSION',
        left: {
          type: 'MODEL'
        },
        right: {
          type: 'LITERAL'
        }
      }
    ]
    changed = true
  }
  return { content, changed }
}

interface IRuleEditorContext {
  models: IRuleModel[];
  mapped: {
    [id: string]: IRuleConditionNode | IRuleGroupNode
  };
  onChange: (nextContent?: any) => void;
  maxDepth?: number;
}
export const RuleEditorContext = createContext<IRuleEditorContext>(undefined)

export const WidthAutoSelect = styled(Select)`
  min-width: auto;
  .next-select-inner {
    min-width: auto;
  }
`
export const RelationSelect = styled(WidthAutoSelect)`
  .next-select-inner {
    background-color: var(--color-warning-2);
  }
`
export const OperatorSelect = styled(WidthAutoSelect)`
  .next-select-inner {
    background-color: var(--color-notice-1);
  }
`

export function tree2map (node: IRuleGroupNode, mapped:{ [id: string]: IRuleConditionNode | IRuleGroupNode } = {}) {
  if (!node) return mapped
  if (!node.id) node.id = uuid()
  mapped[node.id] = node
  if (node.children) {
    node.children.forEach(child => {
      if (!child.id) child.id = uuid()
      child.parentId = node.id
      mapped[child.id] = child
      if (child.type === 'GROUP_EXPRESSION') {
        tree2map(child, mapped)
      }
    })
  }
  return mapped
}

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
  const { onChange } = useContext(RuleEditorContext)
  return <Box direction='column' align='center' style={style}>
    {/* 1 */}
    {/* <Box flex={1} style={{ width: '38.2%', borderLeft: '1px solid #E6E6E6', borderTop: '1px solid #E6E6E6', alignSelf: 'flex-end' }} /> */}
    <BracketTop />
    {/* 2 */}
    <Box direction='column' align='center' spacing={0} style={{ position: 'relative' }}>
      <RelationSelect
        defaultValue={node.relation}
        dataSource={[
          { label: '且', value: 'AND' },
          { label: '或', value: 'OR' }
        ]}
        style={{ width: 60 }}
        onChange={(value, action, item) => {
          node.relation = value
          onChange()
        }}
      />
      <Button
        onClick={() => {
          node.children.push({
            id: uuid(),
            type: 'CONDITION_EXPRESSION',
            left: { type: 'MODEL' },
            right: { type: 'LITERAL', value: '' },
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

// 条件 - 外层
export const RuleConditionNodeWrapper = styled.div`
  padding: var(--s-2);
  background-color: var(--color-fill1-1);
  &:hover {
    background-color: var(--color-fill1-4);
  }
`

interface IModelAndFieldProps {
  models: IRuleModel[];
  expression: IMemberExpression;
}

// 条件 - 模型 & 字段
export function ModelAndField ({ models: remoteModels = [], expression, ...extra }: IModelAndFieldProps) {
  const { onChange } = useContext(RuleEditorContext)

  const [models, setModels] = useState<IRuleModel[]>(remoteModels)
  useEffect(() => {
    setModels(remoteModels)
  }, [remoteModels])

  const [model, setModel] = useState<IRuleModel>()
  useEffect(() => {
    if (!models) return
    setModel(
      models.find(item => item.id === expression.modelId)
    )
  }, [models, expression])

  const [field, setField] = useState<IRuleField>()
  useEffect(() => {
    if (!model) return
    setField(
      model.fields.find(item => item.id === expression.fieldId)
    )
  }, [model, expression])

  //
  const [modelDataSource, setModelDataSource] = useState([])
  useEffect(() => {
    setModelDataSource(
      models.map(item => ({ ...item, label: `${item.name} #${item.id}`, value: item.id }))
    )
  }, [models])
  const [fieldDataSource, setFieldDataSource] = useState([])
  useEffect(() => {
    if (!model) return
    setFieldDataSource(
      model.fields.map(item => ({ ...item, label: item.name, value: item.id }))
    )
  }, [model])

  return <Box direction='row' spacing={8} {...extra}>
    <WidthAutoSelect
      defaultValue={expression.modelId}
      value={model?.id}
      dataSource={modelDataSource}
      onChange={(value, action, item: IRuleModel) => {
        setModel(item)
        setField(undefined)

        expression.modelId = value
        expression.modelName = item.name
        onChange()
      }}
      style={{ width: 120 }}
      autoWidth={false}
    />
    <WidthAutoSelect
      defaultValue={expression.fieldId}
      value={field?.id}
      dataSource={fieldDataSource}
      onChange={(value, action, item: IRuleField) => {
        setField(item)

        expression.fieldId = value
        expression.fieldName = item.name
        onChange()
      }}
      disabled={model === undefined}
      style={{ width: 120 }}
      autoWidth={false}
    />
  </Box>
}

const SETTER_MAP = {
  BoolSetter: Switch,
  NumberSetter: (props: NumberPickerProps) => <NumberPicker style={{ width: 120 }} {...props} />,
  RangeSetter: (props: RangeProps) => <Range style={{ width: 120, padding: '0 calc(var(--range-size-m-slider-hw) / 2)' }} {...props} />,
  TextSetter: (props: InputProps) => <Input style={{ width: 120 }} {...props} />,
  DateSetter: (props: DatePickerProps) => <DatePicker style={{ width: 120 }} {...props} />,
  DateTimeSetter: (props: DatePickerProps) => <DatePicker showTime {...props} />,
  YearSetter: (props: YearPickerProps) => <DatePicker.YearPicker style={{ width: 120 }} {...props} />,
  MonthSetter: (props: MonthPickerProps) => <DatePicker.MonthPicker style={{ width: 120 }} {...props} />,
  RangeDateSetter: DatePicker.RangePicker,
  RangeDateTimeSetter: (props: RangePickerProps) => <DatePicker.RangePicker showTime {...props} />,
  TimeSetter: TimePicker
}

export function LiteralSetter ({ node } :{ node: IRuleConditionNode }) {
  const { models, onChange } = useContext(RuleEditorContext)
  const { left, right } = node

  const [leftModel, setLeftModel] = useState<IRuleModel>()
  useEffect(() => {
    if (!models) return
    setLeftModel(
      models.find(item => item.id === left.modelId)
    )
  }, [models, left.modelId])
  const [leftField, setLeftField] = useState<IRuleField>()
  useEffect(() => {
    if (!leftModel) return
    setLeftField(
      leftModel.fields.find(item => item.id === left.fieldId)
    )
  }, [leftModel, left.fieldId])

  if (!leftField) return null

  const { setter, setterProps } = leftField
  const extraProps = {
    defaultValue: right.value,
    onChange: (value) => {
      right.value = value
      onChange()
    }
  }
  let nextSetter: ReactNode
  if (setter) {
    if (typeof setter === 'string') {
      const SetterComponent: any = SETTER_MAP[setter.trim()]
      nextSetter = <SetterComponent {...setterProps} {...extraProps} />
    } else {
      nextSetter = React.cloneElement(setter, extraProps)
    }
  } else {
    // 默认
    const SetterComponent: any = SETTER_MAP.TextSetter
    nextSetter = <SetterComponent {...setterProps} {...extraProps} />
  }

  return nextSetter
}
