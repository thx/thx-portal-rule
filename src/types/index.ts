/* eslint-disable no-use-before-define */
/// <reference types="react" />

import React from 'react'

/**
 *
 */
export interface INextRecord {
  label: string;
  value: any
}

/**
 *
 */

export interface IRule {
  id?: number;
  content: IRuleGroupNode;
}

export enum IRuleNodeType {
  GROUP = 'GROUP',
  CONDITION = 'CONDITION'
}

export enum IRelation {
  AND = 'AND',
  OR = 'OR'
}

// MO TODO https://www.chaijs.com/api/bdd/#method_not
// Quantifiers asterisk *
export enum IRuleConditionOperator {
  EQUAL = 'EQUAL', // 等于
  NOT_EQUAL = 'NOT_EQUAL', // 不等于
  LESS_THAN = 'LESS_THAN', // 小于
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL', // 小于等于
  GREATER_THAN = 'GREATER_THAN', // 大于
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL', // 大于等于

  /** https://www.chaijs.com/api/bdd/#method_include */
  INCLUDE = 'INCLUDE', // 包含
  NOT_INCLUDE = 'NOT_INCLUDE', // 不包含

  /** https://www.chaijs.com/api/bdd/#method_within */
  WITHIN = 'WITHIN',
  NOT_WITHIN = 'NOT_WITHIN',

  BEGIN_WITH = 'BEGIN_WITH',
  NOT_BEGIN_WITH = 'NOT_BEGIN_WITH',
  END_WITH = 'END_WITH',
  NOT_END_WITH = 'NOT_END_WITH',

  /** https://www.chaijs.com/api/bdd/#method_match */
  MATCH = 'MATCH',
  NOT_MATCH = 'NOT_MATCH',

  /** Asserts that the target is a member of the given array. */
  ONE_OF = 'ONE_OF', // 成员
  NOT_ONE_OF = 'NOT_ONE_OF', // 成员
  /** Asserts that the target array has the same members as the given array. */
  MEMBERS = 'MEMBERS', // 成员
  NOT_MEMBERS = 'NOT_MEMBERS', // 成员

  /** 改变 */
  CHANGE = 'CHANGE',
  /** 不改变 */
  NOT_CHANGE = 'NOT_CHANGE',

}

export interface IOperatorMap {
  [type: string]: IOperatorMapItem[];
}

export interface IOperatorMapItem {
  label: string;
  value: IRuleConditionOperator | any;
}

export const RuleConditionOperatorMap: {
  [type: string]: IOperatorMapItem
} = {
  EQUAL: { label: '等于', value: IRuleConditionOperator.EQUAL },
  NOT_EQUAL: { label: '不等于', value: IRuleConditionOperator.NOT_EQUAL },
  LESS_THAN: { label: '小于', value: IRuleConditionOperator.LESS_THAN },
  LESS_THAN_OR_EQUAL: { label: '小于等于', value: IRuleConditionOperator.LESS_THAN_OR_EQUAL },
  GREATER_THAN: { label: '大于', value: IRuleConditionOperator.GREATER_THAN },
  GREATER_THAN_OR_EQUAL: { label: '大于等于', value: IRuleConditionOperator.GREATER_THAN_OR_EQUAL },

  INCLUDE: { label: '包含', value: IRuleConditionOperator.INCLUDE },
  NOT_INCLUDE: { label: '不包含', value: IRuleConditionOperator.NOT_INCLUDE },

  WITHIN: { label: '在之间', value: IRuleConditionOperator.WITHIN },
  NOT_WITHIN: { label: '在之外', value: IRuleConditionOperator.NOT_WITHIN },

  BEGIN_WITH: { label: '以开头', value: IRuleConditionOperator.BEGIN_WITH },
  END_WITH: { label: '以结尾', value: IRuleConditionOperator.END_WITH },

  MATCH: { label: '匹配', value: IRuleConditionOperator.MATCH },
  NOT_MATCH: { label: '不匹配', value: IRuleConditionOperator.NOT_MATCH },

  ONE_OF: { label: '成员', value: IRuleConditionOperator.ONE_OF },
  MEMBERS: { label: '成员', value: IRuleConditionOperator.MEMBERS },

  CHANGE: { label: '改变', value: IRuleConditionOperator.CHANGE },
  NOT_CHANGE: { label: '不改变', value: IRuleConditionOperator.NOT_CHANGE }

}

export enum IRuleMode {
  LITERAL = 'LITERAL',
  MODEL = 'MODEL'
}

export enum IExpressionType {
  LITERAL = 'LITERAL',
  MODEL = 'MODEL'
}

export interface ILiteralExpression {
  type: IExpressionType.LITERAL;
  value?: string | any;
}

export interface IMemberExpression {
  type: IExpressionType.MODEL;
  modelId?: number;
  modelName?: string;
  modelCode?: string;
  fieldId?: number;
  fieldName?: string;
  fieldCode?: string;
  fieldType?: IFieldType;
  value?: string | any;
}

export interface IRuleGroupNode {
  id: number;
  parentId?: number;
  type: IRuleNodeType.GROUP;
  relation?: IRelation,
  children?: (IRuleConditionNode | IRuleGroupNode)[];
}

export interface IRuleConditionNode {
  id?: number;
  parentId?: number;
  type: IRuleNodeType.CONDITION;
  left?: IMemberExpression;
  right?: ILiteralExpression | IMemberExpression;
  operator?: IRuleConditionOperator;
}

/**
 * 模型 + 字段
 */
export interface IRuleModel {
  id: number;
  name: string;
  code: string;
  fields: IRuleField[]
}

export type ISetter =
  'BoolSetter' | 'NumberSetter' | 'RangeSetter' | 'TextSetter' |
  'DateSetter' | 'DateTimeSetter' | 'YearSetter' | 'MonthSetter' | 'RangeDateSetter' | 'RangeDateTimeSetter' | 'TimeSetter' |
  React.ReactElement

export interface IRuleField {
  id: number;
  name: string;
  code: string;
  type?: IFieldType;
  /** 配置项的设置器 */
  setter?: ISetter;
  /** 针对设置器的配置 */
  setterProps?: { [key: string]: any; };
}

export type IFieldType = 'BOOLEAN' |'NUMBER' |'STRING' |'DATE' |'DATETIME' | 'COLLECTION' | string
