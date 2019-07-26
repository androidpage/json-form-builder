import { PanelType } from 'office-ui-fabric-react/lib/Panel';
import { IPartialTheme } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import { IFormDefinition } from '../interfaces/form.interface';
import { EDisplayMode } from '../shared/DisplayMode';
export interface IReactJsonFormProps<T extends object = {}> {
    definition: IFormDefinition;
    maxWidth?: number;
    theme?: IPartialTheme;
    displayMode?: EDisplayMode;
    isOpen?: boolean;
    panelType?: PanelType;
    saveAction: (formObject: any) => boolean | Promise<boolean>;
    cancelAction: () => void;
    onFormDataChange?: (formIsValid: boolean, formData: object) => void;
    successMessage?: string;
    failMessage?: string;
    variables?: T;
}
export interface IReactJsonFormState {
    definition: IFormDefinition | null;
    formObject: object;
    isValid: boolean;
}
export declare class ReactJsonForm<T extends object = {}> extends React.Component<IReactJsonFormProps<T>, IReactJsonFormState> {
    constructor(props: IReactJsonFormProps<T>);
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
    save(): boolean | Promise<boolean>;
    private customPanelHeaderRenderer;
    private handleFieldChange;
    private getRequiredFields;
    private checkRequiredFields;
    private fillDefinitionVars;
    private formIsValid;
    private saveAction;
    private cancelAction;
}
