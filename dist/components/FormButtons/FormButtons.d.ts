import * as React from 'react';
export interface IFormButtonsProps {
    saveAction: () => Promise<boolean> | boolean;
    cancelAction: () => void;
}
export interface IFormButtonsState {
}
export default class FormButtons extends React.Component<IFormButtonsProps, IFormButtonsState> {
    constructor(props: IFormButtonsProps);
    render(): JSX.Element;
    private saveAction;
    private cancelAction;
}
