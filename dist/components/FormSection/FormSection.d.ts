import * as React from 'react';
import { IFormSectionDefinition } from '../../interfaces/form.interface';
export interface IFormSectionProps {
    definition: IFormSectionDefinition;
}
export interface IFormSectionState {
}
export default class FormSection extends React.Component<IFormSectionProps, IFormSectionState> {
    constructor(props: IFormSectionProps);
    render(): JSX.Element;
}
