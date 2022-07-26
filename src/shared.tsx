import { INextRecord } from './types/index'

let __uuid__ = 0
export function uuid () {
  return Date.now() + ++__uuid__
}

export const OPERATOR_TYPE_MAP: { [type: string]: INextRecord[] } = {
  'group': [
    {
      label: '且',
      value: 'AND'
    },
    {
      label: '或',
      value: 'OR'
    }
  ],
  '*': [
    {
      label: '等于',
      value: '=='
    },
    {
      label: '不等于',
      value: '!=='
    },
    {
      label: '不包含',
      value: 'not_in'
    },
    {
      label: '小于',
      value: '<'
    },
    {
      label: '大于',
      value: '>'
    },
    {
      label: '大于等于',
      value: '>='
    },
    {
      label: '小于等于',
      value: '<='
    },
    {
      label: '在之间',
      value: 'between'
    },
    {
      label: '以开头',
      value: 'begins_with'
    },
    {
      label: '以结尾',
      value: 'ends_with'
    }
  ],
  'date': [
    {
      label: '等于',
      value: '=='
    },
    {
      label: '小于',
      value: '<'
    },
    {
      label: '小于等于',
      value: '<='
    },
    {
      label: '大于',
      value: '>'
    },
    {
      label: '大于等于',
      value: '>='
    },
    {
      label: '不等于',
      value: '!=='
    }
  ],
  'datetime': [
    {
      label: '等于',
      value: '=='
    },
    {
      label: '小于',
      value: '<'
    },
    {
      label: '小于等于',
      value: '<='
    },
    {
      label: '大于',
      value: '>'
    },
    {
      label: '大于等于',
      value: '>='
    },
    {
      label: '不等于',
      value: '!=='
    }
  ],
  'boolean': [
    {
      label: '不等于',
      value: '!=='
    },
    {
      label: '等于',
      value: '=='
    }
  ],
  'number': [
    {
      label: '等于',
      value: '=='
    },
    {
      label: '不等于',
      value: '!=='
    },
    {
      label: '小于',
      value: '<'
    },
    {
      label: '大于',
      value: '>'
    },
    {
      label: '大于等于',
      value: '>='
    },
    {
      label: '小于等于',
      value: '<='
    }
  ],
  'events': [
    {
      label: '改变',
      value: 'change'
    },
    {
      label: '不改变',
      value: 'no change'
    }
  ],
  'string': [
    {
      label: '等于',
      value: '=='
    },
    {
      label: '不等于',
      value: '!=='
    },
    {
      label: '包含',
      value: 'in'
    },
    {
      label: '不包含',
      value: 'not_in'
    },
    {
      label: '开始于',
      value: 'begins_with'
    },
    {
      label: '结束于',
      value: 'ends_with'
    }
  ],
  'collection': [
    {
      label: '包含',
      value: 'contain'
    },
    {
      label: '不包含',
      value: 'exclusive'
    }
  ],
  'stringcollection': [
    {
      label: '包含',
      value: 'contain'
    },
    {
      label: '不包含',
      value: 'exclusive'
    }
  ]
}

export const EXPRESSION_TYPE_DATASOURCE = [
  { label: '自身值', value: 'LITERAL' },
  { label: '模型', value: 'MODEL' }
]
