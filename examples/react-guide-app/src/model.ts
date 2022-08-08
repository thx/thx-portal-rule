import { mock } from 'mockjs'
import {
  IRuleGroupNode, IRuleConditionOperator, IRelation,
  IRuleModel,
  OPERATOR_TYPE_MAP,
  IRuleNodeType,
  IExpressionType,
  ISetter,
  IRuleConditionNode
} from 'thx-portal-rule'

// 概念
// Program Expression left right operator
// Rule / condition

let __uuid__ = 0
export function uuid () {
  return ++__uuid__
}

const SETTER_NAME_LIST: ISetter[] = ['BoolSetter', 'NumberSetter', 'RangeSetter', 'TextSetter', 'DateSetter', 'DateTimeSetter', 'YearSetter', 'MonthSetter', 'RangeDateSetter', 'RangeDateTimeSetter', 'TimeSetter']

export const MOCK_MODEL_LIST: IRuleModel[] = mock({
  'list|10': [{
    'id|1000-9999': 1,
    name: '模型@cword(5)',
    code: '@word(5)',
    [`fields|${SETTER_NAME_LIST.length}`]: [
      {
        'id|1000-9999': 1,
        name: '字段@cword(5)',
        code: '@word(5)',
        'setter|+1': SETTER_NAME_LIST
      }
    ]
  }]
}).list.map((model: IRuleModel) => ({
  ...model,
  fields: model.fields.map(field => ({
    ...field,
    name: `${field.setter} ${field.name} #${field.code}`
  }))
}))

export const MOCK_CONTENT: IRuleGroupNode = {
  id: uuid(),
  type: IRuleNodeType.GROUP,
  relation: IRelation.AND,
  children: [
    {
      id: uuid(),
      type: IRuleNodeType.GROUP,
      relation: IRelation.AND,
      children: [
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[0].id,
            modelName: MOCK_MODEL_LIST[0].name,
            fieldId: MOCK_MODEL_LIST[0].fields[0].id,
            fieldName: MOCK_MODEL_LIST[0].fields[0].name
          },
          right: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[1].id,
            modelName: MOCK_MODEL_LIST[1].name,
            fieldId: MOCK_MODEL_LIST[1].fields[1].id,
            fieldName: MOCK_MODEL_LIST[1].fields[1].name
          },
          operator: OPERATOR_TYPE_MAP['*'][0].value
        },
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[2].id,
            modelName: MOCK_MODEL_LIST[2].name,
            fieldId: MOCK_MODEL_LIST[2].fields[2].id,
            fieldName: MOCK_MODEL_LIST[2].fields[2].name
          },
          right: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[3].id,
            modelName: MOCK_MODEL_LIST[3].name,
            fieldId: MOCK_MODEL_LIST[3].fields[3].id,
            fieldName: MOCK_MODEL_LIST[3].fields[3].name
          },
          operator: OPERATOR_TYPE_MAP['*'][1].value
        }
      ]
    },
    ...SETTER_NAME_LIST.map<IRuleConditionNode>(setter => ({
      id: uuid(),
      type: IRuleNodeType.CONDITION,
      left: {
        type: IExpressionType.MODEL,
        modelId: MOCK_MODEL_LIST[4].id,
        modelName: MOCK_MODEL_LIST[4].name,
        fieldId: MOCK_MODEL_LIST[4].fields.find(field => field.setter === setter)?.id,
        fieldName: MOCK_MODEL_LIST[4].fields.find(field => field.setter === setter)?.name
      },
      right: {
        type: IExpressionType.LITERAL,
        value: ''
      },
      operator: IRuleConditionOperator.EQUAL
    }))
  ]
}
