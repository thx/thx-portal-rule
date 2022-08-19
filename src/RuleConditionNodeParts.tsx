import styled from 'styled-components'
import { Balloon, Box, Button, DatePicker, Icon, Input, NumberPicker, Range, Select, Switch, TimePicker } from '@alifd/next'
import { IRuleConditionNode, IRuleField, IMemberExpression, IRuleModel, IRuleNodeType, ILiteralExpression, IOperatorMap } from './types/index'
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
  const { onChange, modelSelectProps = {}, fieldSelectProps = {} } = useContext(RuleEditorContext)
  const { style: modelStyle = {}, ...modelSelectExtraProps } = modelSelectProps
  const { style: fieldStyle = {}, ...fieldSelectExtraProps } = fieldSelectProps

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
      models.map(item => ({ ...item, label: item.name, value: item.id }))
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
        
        delete expression.fieldId
        delete expression.fieldName
        delete expression.fieldType
        onChange()
      }}
      style={{ width: 120, ...modelStyle }}
      {...modelSelectExtraProps}
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
        expression.fieldType = item.type
        onChange()
      }}
      disabled={model === undefined}
      style={{ width: 120, ...fieldStyle }}
      {...fieldSelectExtraProps}
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
export function OperatorSelect ({ node, style }: IOperatorSelectProps) {
  const { onChange, operatorMap, operatorProps = {}, contentMap } = useContext(RuleEditorContext)
  const { operator, left: expression, id } = node
  const { style: operatorStyle = {} } = operatorProps
  
  const currentOperatorMap: IOperatorMap = operatorMap || OPERATOR_TYPE_MAP
  const dataSource = currentOperatorMap[expression.fieldType || '*'] || currentOperatorMap['*']

  useEffect(() => {
    if ((contentMap[id] as IRuleConditionNode)?.operator === node.operator) {
      delete node.operator
      onChange()
    }
  }, [expression.modelId, expression.fieldId])
  // TODO: 优化model和field联动operator的判断逻辑

  return <OperatorSelectWrapper
    defaultValue={operator}
    value={operator}
    dataSource={dataSource}
    onChange={(value, action, item) => {
      node.operator = value
      onChange()
    }}
    style={{ ...style, width: 90, ...operatorStyle }}
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

  const { setter, setterProps = {} } = leftField || {}
  const { style: setterStyle = {} } = setterProps
  const extraProps = {
    defaultValue: right.value,
    onChange: (value) => {
      right.value = value
      onChange()
    },
    style: { ...style, ...setterStyle },
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

function AppendSiblingIcon (props) {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    version='1.1'
    viewBox='0 0 1024 1024'
    width='30'
    height='30'
    {...props}
  >
    <path
      d='M288 704.5h-64v-160H64v-64h160v-160h64v160h160v64H288zM512 319.5h448v64H512zM512 480.5h448v64H512zM512 640.5h448v64H512z'
    />
  </svg>
}

export function AppendSiblingButton ({ style, child }: { style?: any; child: IRuleConditionNode; }) {
  const { appendSibling, onChange } = useContext(RuleEditorContext)
  return <Balloon.Tooltip
    trigger={
      <Button
        style={{ width: 48, padding: 0, ...style }}
        onClick={() => {
          appendSibling(child)
          onChange()
        }}
      >
        {/* <Icon type='add' /> */}
        <Icon><AppendSiblingIcon /></Icon>
      </Button>
    }
    align='t'
  >
    <div>添加同级条件</div>
  </Balloon.Tooltip>
}

function AppendChildIcon (props) {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    version='1.1'
    viewBox='0 0 1024 1024'
    width='24'
    height='24'
    {...props}
  >
    <path
      d='M288 401.9h-64V562H64v64h160v160h64V626h160v-64H288zM512 400.9h448v64H512zM512 562h448v64H512zM512 722h448v64H512zM64 238h896v64H64z'
    />
  </svg>
}

export function AppendChildButton ({ style, child }: { style?: any; child: IRuleConditionNode; }) {
  const { appendGroupWithChild, onChange } = useContext(RuleEditorContext)

  // if (maxDepth && depth >= maxDepth) return null
  return <Balloon.Tooltip
    trigger={
      <Button
        style={{ width: 48, padding: 0, ...style }}
        onClick={() => {
          appendGroupWithChild(child)
          onChange()
        }}

      >
        {/* <Icon type='toggle-right' /> */}
        <Icon><AppendChildIcon /></Icon>
      </Button>
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
