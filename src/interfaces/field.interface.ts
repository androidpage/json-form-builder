import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ReactText } from 'react';

export enum EFieldType {
  'text' = 'text',
  'multiline-text' = 'multiline-text',
  'dropdown' = 'dropdown',
  'date' = 'date',
  'datetime' = 'datetime',
  'choice' = 'choice',
  'uploader' = 'uploader',
  'checkbox' = 'checkbox',
  'info-note' = 'info-note',
  'grid-placeholder' = 'grid-placeholder',
}

export enum EStoreValue {
  'key',
  'value',
}

export enum EVisibleIfOperators {
  '==',
  '!=',
  '<=',
  '>=',
  '<',
  '>',
}

export interface IOption {
  key: ReactText;
  text: string;
}

export interface IVisibleIf {
  operator: EVisibleIfOperators;
  field: string;
  value: string;
}

export function choiceFromOption(option: IOption): IChoiceGroupOption {
  return {
    key: option.key.toString(),
    text: option.text,
  };
}

export interface IFieldDefinition {
  fieldName?: string;
  label: string;
  type: EFieldType | string;
  columnSpan?: number;
  default?: string;
  dontSave?: boolean;
  keyField?: string;
  // Replace with variable data
  lookupList?: string;
  max?: number;
  min?: number;
  options?: IOption[];
  orderBy?: string;
  placeholder?: string;
  prefix?: string;
  readOnly?: boolean;
  required?: boolean;
  storeValue?: EStoreValue | string;
  styleString?: string; // JSON stringified styles: "{\"backgroundColor\": \"blue\"}"
  suffix?: string;
  validator?: RegExp; // Confirm this works - type might need to be string
  valueField?: string;
  visibleIf?: IVisibleIf;
  [additionalProperties: string]: any;
}
