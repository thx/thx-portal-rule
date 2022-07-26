/* eslint-disable no-use-before-define */
/// <reference types="react" />

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
  value?: string;
}

export interface IMemberExpression {
  type: 'MODEL';
  modelId?: number;
  modelName?: string;
  fieldId?: number;
  fieldName?: string;
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
}
