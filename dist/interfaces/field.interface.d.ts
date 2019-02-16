import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ReactText } from 'react';
export declare enum EFieldType {
    'text' = "text",
    'multiline-text' = "multiline-text",
    'dropdown' = "dropdown",
    'date' = "date",
    'datetime' = "datetime",
    'choice' = "choice",
    'uploader' = "uploader",
    'checkbox' = "checkbox",
    'info-note' = "info-note",
    'grid-placeholder' = "grid-placeholder"
}
export declare enum EStoreValue {
    'key' = 0,
    'value' = 1
}
export declare enum EVisibleIfOperators {
    '==' = 0,
    '!=' = 1,
    '<=' = 2,
    '>=' = 3,
    '<' = 4,
    '>' = 5
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
export declare function choiceFromOption(option: IOption): IChoiceGroupOption;
export interface IFieldDefinition {
    fieldName?: string;
    label: string;
    type: EFieldType | string;
    columnSpan?: number;
    default?: string;
    dontSave?: boolean;
    keyField?: string;
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
    styleString?: string;
    suffix?: string;
    validator?: RegExp;
    valueField?: string;
    visibleIf?: IVisibleIf;
    [additionalProperties: string]: any;
}
