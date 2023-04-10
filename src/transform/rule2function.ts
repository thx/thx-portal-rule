import { rule2expression } from './rule2expression'
import { IRuleGroupNode } from '../types/index'

function group2function (group?: IRuleGroupNode) {
  if (!group) return
  // @ts-ignore
  return (context = {}) => {
    try {
      // with(context) {
      return eval( // eslint-disable-line no-eval
        rule2expression(group, 'context.')
      )
      // }
    } catch (error) {
      console.warn(error.message)
    }
  }
}

export function rule2function (group?: IRuleGroupNode) {
  return group2function(group)
}
