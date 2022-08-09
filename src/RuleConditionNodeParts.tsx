import styled from 'styled-components'
import { Balloon, Box, Button, DatePicker, Icon, Input, NumberPicker, Range, Select, Switch, TimePicker } from '@alifd/next'
import { IRuleConditionNode, IRuleField, IMemberExpression, IRuleModel, IRuleNodeType, ILiteralExpression } from './types/index'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { RangeProps } from '@alifd/next/types/range'
import { InputProps } from '@alifd/next/types/input'
import { DatePickerProps, MonthPickerProps, RangePickerProps, YearPickerProps } from '@alifd/next/types/date-picker'
import { NumberPickerProps } from '@alifd/next/types/number-picker'
import { RuleEditorContext } from './RuleEditorContext'
import { WidthAutoSelect } from './RuleEditorParts'
import { EXPRESSION_TYPE_DATASOURCE, OPERATOR_TYPE_MAP } from './shared'
import { SelectProps } from '@alifd/next/types/select'
import { TimePickerProps } from '@alifd/next/types/time-picker'
moment.locale('zh-cn')

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

const OperatorSelectWrapper = styled(Select)`
  min-width: auto;
  .next-select-inner {
    min-width: auto;
    background-color: var(--color-notice-1);
  }
`

interface IOperatorSelectProps extends SelectProps {
  node: IRuleConditionNode;
}

// 操作符下拉框，优先读取自定义操作符映射列表
export function OperatorSelect ({ style, node }: IOperatorSelectProps) {
  const { onChange } = useContext(RuleEditorContext)
  const { operator } = node

  // TODO TODO node.left.type => 可选的操作符列表
  // 优先级：自定义操作符列表（类型与列表的映射） 大于 默认操作符列表（类型与列表的映射）
  // const { CUSTOM_LOCAL_OPERATOR_TYPE_MAP /* 自定义操作符列表（类型与列表的映射） */ } = useContext(RuleEditorContext)
  // const localOperatorMap = CUSTOM_LOCAL_OPERATOR_TYPE_MAP || OPERATOR_TYPE_MAP
  // const localType = node.left.type || '*'
  // const dataSource = localOperatorMap[localType]

  return <OperatorSelectWrapper
    defaultValue={operator}
    dataSource={OPERATOR_TYPE_MAP['*']}
    onChange={(value, action, item) => {
      node.operator = value
      onChange()
    }}
    style={{ ...style, width: 90 }}
  />
}

const ExpressionTypeSelectWrapper = styled(Select)`
  min-width: auto;
  .next-select-inner {
    min-width: auto;
  }
`

interface IExpressionTypeSelectProps extends SelectProps {
  expression: ILiteralExpression | IMemberExpression;
}

export function ExpressionTypeSelect ({ style, expression }: IExpressionTypeSelectProps) {
  const { onChange } = useContext(RuleEditorContext)
  return <ExpressionTypeSelectWrapper
    defaultValue={expression?.type}
    value={expression?.type}
    dataSource={EXPRESSION_TYPE_DATASOURCE}
    onChange={(value, action, item) => {
      expression.type = value
      onChange()
    }}
    style={{ ...style, width: 90 }}
  />
}

const SETTER_MAP = {
  BoolSetter: Switch,
  NumberSetter: ({ style, ...extra }: NumberPickerProps) => <NumberPicker style={{ width: 'var(--s-30, 120px)', ...style }} {...extra} />,
  RangeSetter: ({ style, ...extra }: RangeProps) => <Range style={{ width: 'var(--s-30, 120px)', padding: '0 calc(var(--range-size-m-slider-hw) / 2)', ...style }} {...extra} />,
  TextSetter: ({ style, ...extra }: InputProps) => <Input style={{ width: 'var(--s-30, 120px)', ...style }} {...extra} />,
  DateSetter: ({ style, ...extra }: DatePickerProps) => <DatePicker style={{ width: 'var(--s-30, 120px)', ...style }} {...extra} />,
  DateTimeSetter: ({ style, ...extra }: DatePickerProps) => <DatePicker showTime style={{ width: 'var(--s-45, 180px)', ...style }} {...extra} />,
  YearSetter: ({ style, ...extra }: YearPickerProps) => <DatePicker.YearPicker style={{ width: 'var(--s-30, 120px)', ...style }} {...extra} />,
  MonthSetter: ({ style, ...extra }: MonthPickerProps) => <DatePicker.MonthPicker style={{ width: 'var(--s-30, 120px)', ...style }} {...extra} />,
  RangeDateSetter: ({ style, ...extra }: RangePickerProps) => <DatePicker.RangePicker style={{ ...style }} {...extra} />,
  RangeDateTimeSetter: ({ style, ...extra }: RangePickerProps) => <DatePicker.RangePicker showTime style={{ ...style }} {...extra} />,
  TimeSetter: ({ style, ...extra }: TimePickerProps) => <TimePicker style={{ width: 'var(--s-30, 120px)', ...style }} {...extra} />
}

export function LiteralSetter ({ style, node } :{ style?: any; node: IRuleConditionNode }) {
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

  // => disabled
  // if (!leftField) return null

  const { setter, setterProps } = leftField || {}
  const extraProps = {
    defaultValue: right.value,
    onChange: (value) => {
      right.value = value
      onChange()
    },
    style,
    disabled: !leftField
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

export function AppendSiblingButton ({ style, child }: { style?: any; child: IRuleConditionNode; }) {
  const { appendSibling, onChange } = useContext(RuleEditorContext)
  return <Balloon.Tooltip
    trigger={
      <Button
        style={style}
        onClick={() => {
          appendSibling(child)
          onChange()
        }}
      ><Icon type='add' /></Button>
    }
    align='t'
  >
    <div>添加同级条件</div>
  </Balloon.Tooltip>
}

export function AppendChildButton ({ style, child }: { style?: any; child: IRuleConditionNode; }) {
  const { appendGroupWithChild, onChange } = useContext(RuleEditorContext)

  // if (maxDepth && depth >= maxDepth) return null
  return <Balloon.Tooltip
    trigger={
      <Button
        style={style}
        onClick={() => {
          appendGroupWithChild(child)
          onChange()
        }}
      ><Icon type='toggle-right' /></Button>
    }
    align='t'
  >
    <div>添加子级条件</div>
  </Balloon.Tooltip>
}

export function RemoveChildButton ({ style, child }: { style?: any; child: IRuleConditionNode; }) {
  const { contentMap, removeChild, onChange } = useContext(RuleEditorContext)
  const parent = contentMap[contentMap[child.id]?.parentId]
  const removable = parent && parent.type === IRuleNodeType.GROUP && parent.children.length > 1
  return <Balloon.Tooltip
    trigger={
      <Button
        style={style}
        onClick={() => {
          removeChild(child)
          onChange()
        }}
        disabled={!removable}
      ><Icon type='ashbin' /></Button>
    }
    align='t'
  >
    <div>删除</div>
  </Balloon.Tooltip>
}
