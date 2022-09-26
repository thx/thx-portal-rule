import { IRuleGroupNode, IRuleConditionNode, IRuleModel, IRuleMode, IOperatorMap, IRelation } from './types/index'
import { createContext } from 'react'
import moment from 'moment'
import { SelectProps } from '@alifd/next/types/select'
moment.locale('zh-cn')

interface IRuleEditorContext {
  mode?: IRuleMode;
  models: IRuleModel[];
  contentMap: {
    [id: string]: IRuleConditionNode | IRuleGroupNode
  };
  appendChild: (parent: IRuleGroupNode) => void;
  appendSibling: (child: IRuleConditionNode) => void;
  appendGroupWithChild: (child: IRuleConditionNode) => void;
  removeChild: (child: IRuleConditionNode) => void;
  onChange: (nextContent?: any) => void;
  maxDepth?: number;
  defaultRelation?: IRelation;
  /** @deprecated => contentMap */
  mapped: {
    [id: string]: IRuleConditionNode | IRuleGroupNode
  };
  operatorMap: IOperatorMap;
  modelSelectProps?: SelectProps;
  fieldSelectProps?: SelectProps;
  // MO TODO operatorProps => operatorSelectProps
  operatorSelectProps?: SelectProps;
}
export const RuleEditorContext = createContext<IRuleEditorContext>(undefined)
