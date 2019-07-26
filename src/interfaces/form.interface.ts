import { IFieldDefinition } from './field.interface';

export interface IFormSectionDefinition {
  fields: IFieldDefinition[];
  title?: string;
  description?: string;
  columns?: number;
  [key: string]: any;
}

export interface IFormObject {
  [key: string]: any;
}

export interface IFormDefinition {
  title: string;
  description?: string;
  fields?: IFieldDefinition[];
  sections?: IFormSectionDefinition[];
  [key: string]: any;
}