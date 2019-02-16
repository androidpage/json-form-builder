import * as React from 'react';
import { IFieldDefinition } from '../../interfaces/field.interface';
export interface IFormFieldProps {
    definition: IFieldDefinition;
    onFieldChange?: (fieldValue: object) => void;
}
export interface IFormFieldState {
}
export default class FormField extends React.Component<IFormFieldProps, IFormFieldState> {
    constructor(props: IFormFieldProps);
    render(): JSX.Element;
    private onFieldChange;
    private getOptions;
}
