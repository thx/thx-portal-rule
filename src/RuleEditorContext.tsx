import { IRuleGroupNode, IRuleConditionNode, IRuleModel, IRuleMode, IOperatorMap, IRelation } from './types/index'
import { createContext } from 'react'
import moment from 'moment'
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
  defaultGroupRelation?: IRelation;
  /** @deprecated => contentMap */
  mapped: {
    [id: string]: IRuleConditionNode | IRuleGroupNode
  };
  operatorMap: IOperatorMap;
  modelSelectProps?: {
    [key: string]: any;
  };
  fieldSelectProps?: {
    [key: string]: any;
  };
  operatorProps?: {
    [key: string]: any;
  };
}
export const RuleEditorContext = createContext<IRuleEditorContext>(undefined)
