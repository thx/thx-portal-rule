import { IRuleGroupNode, IRuleConditionNode, IRuleModel, IRuleMode } from './types/index'
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
  /** @deprecated => contentMap */
  mapped: {
    [id: string]: IRuleConditionNode | IRuleGroupNode
  };
}
export const RuleEditorContext = createContext<IRuleEditorContext>(undefined)
