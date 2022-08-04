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

export interface ILiteralExpression {
  type: 'LITERAL';
  value?: string | any;
}

export interface IMemberExpression {
  type: 'MODEL';
  modelId?: number;
  modelName?: string;
  fieldId?: number;
  fieldName?: string;
  value?: string | any;
}

export interface IRuleGroupNode {
  id: number;
  parentId?: number;
  type: 'GROUP_EXPRESSION';
  relation?: IRelation,
  children?: (IRuleConditionNode | IRuleGroupNode)[];
}

export interface IRuleConditionNode {
  id?: number;
  parentId?: number;
  type: 'CONDITION_EXPRESSION';
  left?: IMemberExpression;
  right?: ILiteralExpression | IMemberExpression;
  operator?: IRuleConditionOperator;
}

/**
 *
 */
export interface IRuleModel {
  id: number;
  name: string;
  code: string;
  fields: IRuleField[]
}

export interface IRuleField {
  id: number;
  name: string;
  code: string;
  /** 配置项的设置器 */
  setter?: 'BoolSetter' | 'NumberSetter' | 'RangeSetter' | 'TextSetter'
    | 'DateSetter' | 'DateTimeSetter' | 'YearSetter' | 'MonthSetter' | 'RangeDateSetter' | 'RangeDateTimeSetter' | 'TimeSetter'
    | React.ReactElement;
  /** 针对设置器的配置 */
  setterProps?: { [key: string]: any; };
}
