import React from 'react'
import RuleEditor, { IRuleEditorProps } from './RuleEditor'
import { FORMULA_RELATION_LIST } from './shared'
import { IFormulaGroupNodeRelation } from './types'

export default (props : IRuleEditorProps) => {
  return <RuleEditor
    defaultRelation={IFormulaGroupNodeRelation.ADD}
    relationSelectProps={() => {
      return {
        dataSource: FORMULA_RELATION_LIST,
        defaultValue: 'ADD'
      }
    }}
    modelSelectProps={(model, position, models) => {
      return position === 'right' ? { style: { display: 'none' } } : {}
    }}
    fieldSelectProps={(field, position, fields) => {
      return position === 'right' ? { style: { display: 'none' } } : {}
    }}
    operatorSelectProps={{
      style: { display: 'none' }
    }}
    typeSelectProps={{
      style: { display: 'none' }
    }}
    literalSetterProps={{
      style: { display: 'none' }
    }}
    {...props}
  />
}
