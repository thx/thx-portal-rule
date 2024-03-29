/* eslint-disable no-use-before-define */
/// <reference types="react" />

import React from 'react'

/** 规则节点类型 */
export enum IRuleNodeType {
  GROUP = 'GROUP',
  CONDITION = 'CONDITION'
}

// MO FIXED 似乎应该是 IRuleGroupNodeRelation
/** 规则分组节点之间的关系 */
export enum IRuleGroupNodeRelation {
  AND = 'AND',
  OR = 'OR'
}

/** 公式分组节点之间的关系 */
export enum IFormulaGroupNodeRelation {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE'
}

// MO TODO https://www.chaijs.com/api/bdd/#method_not
// Quantifiers asterisk *
/** 操作符 */
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

/** 操作符集合 */
export interface IOperatorMap {
  [fieldType: string]: IOperatorMapItem[];
}

/** 单个操作符 */
export interface IOperatorMapItem {
  label: string;
  value: IRuleConditionOperator | any;
  code?: (node: IRuleConditionNode, left: string, right: string) => string;
}

/** 表达式右侧类型 */
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
  fieldType?: IRuleFieldType;
  value?: string | any;
}

export interface IRuleGroupNode {
  id: number;
  parentId?: number;
  type: IRuleNodeType.GROUP;
  relation?: IRuleGroupNodeRelation | IFormulaGroupNodeRelation,
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
  /** 唯一标识。TODO 似乎会导致数据转换非常麻烦。 */
  id: number;
  name: string;
  code: string;
  tooltip?: any;
  type?: IRuleFieldType;
  /** 配置项的设置器 */
  setter?: ISetter;
  /** 针对设置器的配置 */
  setterProps?: { [key: string]: any; };
}

// MO FIXED IFieldType => IRuleFieldType，需要暴露这个类型声明吗？不需要，减少顶层概念的数量
export type IRuleFieldType = '*' | 'BOOLEAN' | 'NUMBER' | 'STRING' | 'DATE' | 'DATETIME' | 'COLLECTION' | string
