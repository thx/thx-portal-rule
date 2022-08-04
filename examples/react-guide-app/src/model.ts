import { mock } from 'mockjs'
import {
  IRuleGroupNode, IRuleConditionOperator, IRelation,
  IRuleModel,
  OPERATOR_TYPE_MAP
} from 'thx-portal-rule'

// 概念
// Program Expression left right operator
// Rule / condition

let __uuid__ = 0
export function uuid () {
  return ++__uuid__
}

export const MOCK_MODEL_LIST: IRuleModel[] = mock({
  'list|10': [{
    'id|1000-9999': 1,
    name: '模型@cword(5)',
    coee: '@word(5)',
    'fields|20': [
      {
        'id|1000-9999': 1,
        name: '字段@cword(5)',
        coee: '@word(5)',
        'setter|+1': ['BoolSetter', 'NumberSetter', 'RangeSetter', 'TextSetter', 'DateSetter', 'DateTimeSetter', 'YearSetter', 'MonthSetter', 'RangeDateSetter', 'RangeDateTimeSetter', 'TimeSetter']
      }
    ]
  }]
}).list

export const MOCK_CONTENT: IRuleGroupNode = {
  id: uuid(),
  type: 'GROUP_EXPRESSION',
  relation: IRelation.AND,
  children: [
    {
      id: uuid(),
      type: 'GROUP_EXPRESSION',
      relation: IRelation.AND,
      children: [
        {
          id: uuid(),
          type: 'CONDITION_EXPRESSION',
          left: {
            type: 'MODEL',
            modelId: MOCK_MODEL_LIST[0].id,
            modelName: MOCK_MODEL_LIST[0].name,
            fieldId: MOCK_MODEL_LIST[0].fields[0].id,
            fieldName: MOCK_MODEL_LIST[0].fields[0].name
          },
          right: {
            type: 'MODEL',
            modelId: MOCK_MODEL_LIST[1].id,
            modelName: MOCK_MODEL_LIST[1].name,
            fieldId: MOCK_MODEL_LIST[1].fields[1].id,
            fieldName: MOCK_MODEL_LIST[1].fields[1].name
          },
          operator: OPERATOR_TYPE_MAP['*'][0].value
        },
        {
          id: uuid(),
          type: 'CONDITION_EXPRESSION',
          left: {
            type: 'MODEL',
            modelId: MOCK_MODEL_LIST[2].id,
            modelName: MOCK_MODEL_LIST[2].name,
            fieldId: MOCK_MODEL_LIST[2].fields[2].id,
            fieldName: MOCK_MODEL_LIST[2].fields[2].name
          },
          right: {
            type: 'MODEL',
            modelId: MOCK_MODEL_LIST[3].id,
            modelName: MOCK_MODEL_LIST[3].name,
            fieldId: MOCK_MODEL_LIST[3].fields[3].id,
            fieldName: MOCK_MODEL_LIST[3].fields[3].name
          },
          operator: OPERATOR_TYPE_MAP['*'][1].value
        }
      ]
    },
    {
      id: uuid(),
      type: 'CONDITION_EXPRESSION',
      left: {
        type: 'MODEL',
        modelId: MOCK_MODEL_LIST[4].id,
        modelName: MOCK_MODEL_LIST[4].name,
        fieldId: MOCK_MODEL_LIST[4].fields[4].id,
        fieldName: MOCK_MODEL_LIST[4].fields[4].name
      },
      right: {
        type: 'MODEL',
        modelId: MOCK_MODEL_LIST[5].id,
        modelName: MOCK_MODEL_LIST[5].name,
        fieldId: MOCK_MODEL_LIST[5].fields[5].id,
        fieldName: MOCK_MODEL_LIST[5].fields[5].name
      },
      operator: IRuleConditionOperator.EQUAL
    }
  ]
}
