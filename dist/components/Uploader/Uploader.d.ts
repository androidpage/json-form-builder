import * as React from 'react';
export interface IUploaderProps {
}
export interface IUploaderState {
}
export default class Uploader extends React.Component<IUploaderProps, IUploaderState> {
    constructor(props: IUploaderProps);
    render(): JSX.Element;
    private onDrop;
}
