import * as React from 'react';
import { IFormDefinition } from '../../interfaces/form.interface';
export interface IFormBodyProps {
    definition: IFormDefinition;
    fieldChangeHandler: (fieldObject: object) => void;
}
export interface IFormBodyState {
}
export default class FormBody extends React.Component<IFormBodyProps, IFormBodyState> {
    render(): JSX.Element;
}
