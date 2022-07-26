import styled from 'styled-components'
import { Box, Button, Select } from '@alifd/next'
import { IRuleGroupNode, IRuleConditionNode, IRuleField, IMemberExpression, IRuleModel } from './types/index'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { uuid } from './shared'

interface IRuleEditorContext {
  models: IRuleModel[];
  mapped: {
    [id: string]: IRuleConditionNode | IRuleGroupNode
  };
  onChange: (nextContent?: any) => void;
}
export const RuleEditorContext = createContext<IRuleEditorContext>(undefined)

export const WidthAutoSelect = styled(Select)`
  min-width: auto;
  .next-select-inner {
    min-width: auto;
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

export function GroupNodeRelationColumn ({ style, node }: { style?: any; node: IRuleGroupNode; }) {
  const { onChange } = useContext(RuleEditorContext)
  return <Box direction='column' align='center' style={style}>
    <Box flex={1} style={{ width: '50%', borderLeft: '1px solid #E6E6E6', borderTop: '1px solid #E6E6E6', alignSelf: 'flex-end' }} />
    <Box direction='column' align='center' spacing={4}>
      <WidthAutoSelect
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
        style={{ borderRadius: 100, width: 'var(--btn-size-m-height, 28px)' }}
      >+</Button>
    </Box>
    <Box flex={1} style={{ width: '50%', borderLeft: '1px solid #E6E6E6', borderBottom: '1px solid #E6E6E6', alignSelf: 'flex-end' }} />
  </Box>
}

export const GroupNodeBodyColumn = styled.div`
  flex: 1;
`

interface IModelAndFieldProps {
  models: IRuleModel[];
  expression: IMemberExpression;
}

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
