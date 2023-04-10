import { mock } from 'mockjs'
import {
  IRuleGroupNode, IRuleConditionOperator, IRuleGroupNodeRelation,
  IRuleModel,
  OPERATOR_TYPE_MAP,
  IRuleNodeType,
  IExpressionType,
  ISetter,
  IRuleConditionNode,
  IOperatorMap,
  IFormulaGroupNodeRelation,
  IRuleFieldType
} from 'thx-portal-rule'

// 概念
// Program Expression left right operator
// Rule / condition

let __uuid__ = 0
export function uuid () {
  return ++__uuid__
}

const SETTER_NAME_LIST: ISetter[] = ['BoolSetter', 'NumberSetter', 'RangeSetter', 'TextSetter', 'DateSetter', 'DateTimeSetter', 'YearSetter', 'MonthSetter', 'RangeDateSetter', 'RangeDateTimeSetter', 'TimeSetter']
const SETTER_TYPE_LIST: IRuleFieldType[] = ['BOOLEAN', 'NUMBER', 'NUMBER', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'COLLECTION', 'COLLECTION', 'STRING']

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
        'setter|+1': SETTER_NAME_LIST,
        'type|+1': SETTER_TYPE_LIST // 'BOOLEAN'
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

export const MOCK_CONTENT_SIMPLE_1: IRuleGroupNode = {
  id: uuid(),
  type: IRuleNodeType.GROUP,
  relation: IRuleGroupNodeRelation.AND,
  children: [
    {
      id: uuid(),
      type: IRuleNodeType.GROUP,
      relation: IRuleGroupNodeRelation.AND,
      children: [
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[0].id,
            modelName: MOCK_MODEL_LIST[0].name,
            modelCode: MOCK_MODEL_LIST[0].code,
            fieldId: MOCK_MODEL_LIST[0].fields[0].id,
            fieldName: MOCK_MODEL_LIST[0].fields[0].name,
            fieldCode: MOCK_MODEL_LIST[0].fields[0].code,
            fieldType: 'BOOLEAN'
          },
          right: {
            type: IExpressionType.LITERAL,
            value: true
          },
          operator: OPERATOR_TYPE_MAP['*'][0].value
        }
      ]
    }
  ]
}

export const MOCK_CONTENT_SIMPLE_2: IRuleGroupNode = {
  id: uuid(),
  type: IRuleNodeType.GROUP,
  relation: IRuleGroupNodeRelation.AND,
  children: [
    {
      id: uuid(),
      type: IRuleNodeType.GROUP,
      relation: IRuleGroupNodeRelation.AND,
      children: [
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[0].id,
            modelName: MOCK_MODEL_LIST[0].name,
            modelCode: MOCK_MODEL_LIST[0].code,
            fieldId: MOCK_MODEL_LIST[0].fields[0].id,
            fieldName: MOCK_MODEL_LIST[0].fields[0].name,
            fieldCode: MOCK_MODEL_LIST[0].fields[0].code,
            fieldType: 'BOOLEAN'
          },
          right: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[1].id,
            modelName: MOCK_MODEL_LIST[1].name,
            modelCode: MOCK_MODEL_LIST[1].code,
            fieldId: MOCK_MODEL_LIST[1].fields[1].id,
            fieldName: MOCK_MODEL_LIST[1].fields[1].name,
            fieldCode: MOCK_MODEL_LIST[1].fields[1].code
          },
          operator: OPERATOR_TYPE_MAP['*'][0].value
        }
      ]
    }
  ]
}

export const MOCK_CONTENT_SIMPLE_3: IRuleGroupNode = {
  id: uuid(),
  type: IRuleNodeType.GROUP,
  relation: IRuleGroupNodeRelation.AND,
  children: [
    {
      id: uuid(),
      type: IRuleNodeType.GROUP,
      relation: IRuleGroupNodeRelation.AND,
      children: [
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[0].id,
            modelName: MOCK_MODEL_LIST[0].name,
            modelCode: MOCK_MODEL_LIST[0].code,
            fieldId: MOCK_MODEL_LIST[0].fields[0].id,
            fieldName: MOCK_MODEL_LIST[0].fields[0].name,
            fieldCode: MOCK_MODEL_LIST[0].fields[0].code,
            fieldType: 'BOOLEAN'
          },
          right: {
            type: IExpressionType.LITERAL,
            value: true
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
            modelCode: MOCK_MODEL_LIST[2].code,
            fieldId: MOCK_MODEL_LIST[2].fields[2].id,
            fieldName: MOCK_MODEL_LIST[2].fields[2].name,
            fieldCode: MOCK_MODEL_LIST[2].fields[2].code,
            fieldType: 'BOOLEAN'
          },
          right: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[3].id,
            modelName: MOCK_MODEL_LIST[3].name,
            modelCode: MOCK_MODEL_LIST[3].code,
            fieldId: MOCK_MODEL_LIST[3].fields[3].id,
            fieldName: MOCK_MODEL_LIST[3].fields[3].name,
            fieldCode: MOCK_MODEL_LIST[3].fields[3].code
          },
          operator: OPERATOR_TYPE_MAP['*'][1].value
        }
      ]
    }
  ]
}

export const MOCK_CONTENT: IRuleGroupNode = {
  id: uuid(),
  type: IRuleNodeType.GROUP,
  relation: IRuleGroupNodeRelation.AND,
  children: [
    {
      id: uuid(),
      type: IRuleNodeType.GROUP,
      relation: IRuleGroupNodeRelation.AND,
      children: [
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[0].id,
            modelName: MOCK_MODEL_LIST[0].name,
            modelCode: MOCK_MODEL_LIST[0].code,
            fieldId: MOCK_MODEL_LIST[0].fields[0].id,
            fieldName: MOCK_MODEL_LIST[0].fields[0].name,
            fieldCode: MOCK_MODEL_LIST[0].fields[0].code,
            fieldType: 'BOOLEAN'
          },
          right: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[1].id,
            modelName: MOCK_MODEL_LIST[1].name,
            modelCode: MOCK_MODEL_LIST[1].code,
            fieldId: MOCK_MODEL_LIST[1].fields[1].id,
            fieldName: MOCK_MODEL_LIST[1].fields[1].name,
            fieldCode: MOCK_MODEL_LIST[1].fields[1].code
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
            modelCode: MOCK_MODEL_LIST[2].code,
            fieldId: MOCK_MODEL_LIST[2].fields[2].id,
            fieldName: MOCK_MODEL_LIST[2].fields[2].name,
            fieldCode: MOCK_MODEL_LIST[2].fields[2].code,
            fieldType: 'BOOLEAN'
          },
          right: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[3].id,
            modelName: MOCK_MODEL_LIST[3].name,
            modelCode: MOCK_MODEL_LIST[3].code,
            fieldId: MOCK_MODEL_LIST[3].fields[3].id,
            fieldName: MOCK_MODEL_LIST[3].fields[3].name,
            fieldCode: MOCK_MODEL_LIST[3].fields[3].code
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
        modelCode: MOCK_MODEL_LIST[4].code,
        fieldId: MOCK_MODEL_LIST[4].fields.find(field => field.setter === setter)?.id,
        fieldName: MOCK_MODEL_LIST[4].fields.find(field => field.setter === setter)?.name,
        fieldCode: MOCK_MODEL_LIST[4].fields.find(field => field.setter === setter)?.code
      },
      right: {
        type: IExpressionType.LITERAL,
        value: ''
      },
      operator: IRuleConditionOperator.EQUAL
    }))
  ]
}

export const MOCK_FORMULA_SIMPLE_1: IRuleGroupNode = {
  id: uuid(),
  type: IRuleNodeType.GROUP,
  relation: IFormulaGroupNodeRelation.ADD,
  children: [
    {
      id: uuid(),
      type: IRuleNodeType.CONDITION,
      left: {
        type: IExpressionType.MODEL,
        modelId: MOCK_MODEL_LIST[0].id,
        modelName: MOCK_MODEL_LIST[0].name,
        modelCode: MOCK_MODEL_LIST[0].code,
        fieldId: MOCK_MODEL_LIST[0].fields[0].id,
        fieldName: MOCK_MODEL_LIST[0].fields[0].name,
        fieldCode: MOCK_MODEL_LIST[0].fields[0].code,
        fieldType: 'BOOLEAN'
      }
    },
    {
      id: uuid(),
      type: IRuleNodeType.CONDITION,
      left: {
        type: IExpressionType.MODEL,
        modelId: MOCK_MODEL_LIST[1].id,
        modelName: MOCK_MODEL_LIST[1].name,
        modelCode: MOCK_MODEL_LIST[1].code,
        fieldId: MOCK_MODEL_LIST[1].fields[1].id,
        fieldName: MOCK_MODEL_LIST[1].fields[1].name,
        fieldCode: MOCK_MODEL_LIST[1].fields[1].code,
        fieldType: 'BOOLEAN'
      }
    }
  ]
}

export const MOCK_FORMULA: IRuleGroupNode = {
  id: uuid(),
  type: IRuleNodeType.GROUP,
  relation: IFormulaGroupNodeRelation.ADD,
  children: [
    {
      id: uuid(),
      type: IRuleNodeType.GROUP,
      relation: IFormulaGroupNodeRelation.ADD,
      children: [
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[0].id,
            modelName: MOCK_MODEL_LIST[0].name,
            modelCode: MOCK_MODEL_LIST[0].code,
            fieldId: MOCK_MODEL_LIST[0].fields[0].id,
            fieldName: MOCK_MODEL_LIST[0].fields[0].name,
            fieldCode: MOCK_MODEL_LIST[0].fields[0].code,
            fieldType: 'BOOLEAN'
          }
        },
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[1].id,
            modelName: MOCK_MODEL_LIST[1].name,
            modelCode: MOCK_MODEL_LIST[1].code,
            fieldId: MOCK_MODEL_LIST[1].fields[1].id,
            fieldName: MOCK_MODEL_LIST[1].fields[1].name,
            fieldCode: MOCK_MODEL_LIST[1].fields[1].code,
            fieldType: 'BOOLEAN'
          }
        }
      ]
    },
    {
      id: uuid(),
      type: IRuleNodeType.GROUP,
      relation: IFormulaGroupNodeRelation.SUBTRACT,
      children: [
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[2].id,
            modelName: MOCK_MODEL_LIST[2].name,
            modelCode: MOCK_MODEL_LIST[2].code,
            fieldId: MOCK_MODEL_LIST[2].fields[2].id,
            fieldName: MOCK_MODEL_LIST[2].fields[2].name,
            fieldCode: MOCK_MODEL_LIST[2].fields[2].code,
            fieldType: 'BOOLEAN'
          }
        },
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[3].id,
            modelName: MOCK_MODEL_LIST[3].name,
            modelCode: MOCK_MODEL_LIST[3].code,
            fieldId: MOCK_MODEL_LIST[3].fields[3].id,
            fieldName: MOCK_MODEL_LIST[3].fields[3].name,
            fieldCode: MOCK_MODEL_LIST[3].fields[3].code,
            fieldType: 'BOOLEAN'
          }
        }
      ]
    },
    {
      id: uuid(),
      type: IRuleNodeType.GROUP,
      relation: IFormulaGroupNodeRelation.MULTIPLY,
      children: [
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[4].id,
            modelName: MOCK_MODEL_LIST[4].name,
            modelCode: MOCK_MODEL_LIST[4].code,
            fieldId: MOCK_MODEL_LIST[4].fields[4].id,
            fieldName: MOCK_MODEL_LIST[4].fields[4].name,
            fieldCode: MOCK_MODEL_LIST[4].fields[4].code,
            fieldType: 'BOOLEAN'
          }
        },
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[5].id,
            modelName: MOCK_MODEL_LIST[5].name,
            modelCode: MOCK_MODEL_LIST[5].code,
            fieldId: MOCK_MODEL_LIST[5].fields[5].id,
            fieldName: MOCK_MODEL_LIST[5].fields[5].name,
            fieldCode: MOCK_MODEL_LIST[5].fields[5].code,
            fieldType: 'BOOLEAN'
          }
        }
      ]
    },
    {
      id: uuid(),
      type: IRuleNodeType.GROUP,
      relation: IFormulaGroupNodeRelation.DIVIDE,
      children: [
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[6].id,
            modelName: MOCK_MODEL_LIST[6].name,
            modelCode: MOCK_MODEL_LIST[6].code,
            fieldId: MOCK_MODEL_LIST[6].fields[6].id,
            fieldName: MOCK_MODEL_LIST[6].fields[6].name,
            fieldCode: MOCK_MODEL_LIST[6].fields[6].code,
            fieldType: 'BOOLEAN'
          }
        },
        {
          id: uuid(),
          type: IRuleNodeType.CONDITION,
          left: {
            type: IExpressionType.MODEL,
            modelId: MOCK_MODEL_LIST[7].id,
            modelName: MOCK_MODEL_LIST[7].name,
            modelCode: MOCK_MODEL_LIST[7].code,
            fieldId: MOCK_MODEL_LIST[7].fields[7].id,
            fieldName: MOCK_MODEL_LIST[7].fields[7].name,
            fieldCode: MOCK_MODEL_LIST[7].fields[7].code,
            fieldType: 'BOOLEAN'
          }
        }
      ]
    }
  ]
}

export const MOCK_OPERATOR_MAP: IOperatorMap = {
  '*': [
    { label: '等于', value: 'EQUAL' },
    { label: '不等于.', value: 'NOT_EQUAL' }
  ],
  'BOOLEAN': [
    { label: '等于', value: 'EQUAL' },
    { label: '不等于', value: 'NOT_EQUAL' },
    { label: '严格等于', value: 'STRICT_EQUAL' }
  ]
}
