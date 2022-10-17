import { IRuleGroupNode, IRuleConditionNode, IRuleModel, IRuleMode, IOperatorMap, IRelation, IRuleField } from './types/index'
import { createContext } from 'react'
import moment from 'moment'
import { SelectProps } from '@alifd/next/types/select'
moment.locale('zh-cn')

export type IModelSelectProps = SelectProps | ((model: IRuleModel, position: 'left' | 'right', models: IRuleModel[]) => SelectProps);
export type IFieldSelectProps = SelectProps | ((field: IRuleField, position: 'left' | 'right', fields: IRuleField[]) => SelectProps);
export type IOperatorSelectProps = SelectProps | ((/** MO TODO 缺少参数 */) => SelectProps);
export type ITypeSelectProps = SelectProps | ((/** MO TODO 缺少参数 */) => SelectProps); ;
export type ILiteralSetterProps = { [key: string]: any; } | ((/** MO TODO 缺少参数 */) => { [key: string]: any; });

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
  modelSelectProps?: IModelSelectProps;
  fieldSelectProps?: IFieldSelectProps;
  operatorSelectProps?: IOperatorSelectProps;
  typeSelectProps?: ITypeSelectProps;
  literalSetterProps?: ILiteralSetterProps;
}
export const RuleEditorContext = createContext<IRuleEditorContext>(undefined)
