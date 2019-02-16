import { IPartialTheme } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import { EDisplayMode } from '../shared/DisplayMode';
import { IFormDefinition } from '../interfaces/form.interface';
import { PanelType } from 'office-ui-fabric-react/lib/Panel';
export interface IReactJsonFormProps<T extends object = {}> {
    definition: IFormDefinition;
    maxWidth?: number;
    theme?: IPartialTheme;
    displayMode?: EDisplayMode;
    isOpen?: boolean;
    panelType?: PanelType;
    saveAction: (formObject: any) => boolean | Promise<boolean>;
    cancelAction: () => void;
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
    private customPanelHeaderRenderer;
    private handleFieldChange;
    private getRequiredFields;
    private checkRequiredFields;
    private fillDefinitionVars;
    private saveAction;
    private cancelAction;
}
