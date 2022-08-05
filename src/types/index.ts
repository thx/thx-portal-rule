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
export enum IRuleConditionOperator {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  ONE_OF = 'ONE_OF'
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
  /** 配置项的设置器 */
  setter?: ISetter;
  /** 针对设置器的配置 */
  setterProps?: { [key: string]: any; };
}
