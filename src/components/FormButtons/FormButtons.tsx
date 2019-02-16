import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import * as styles from './FormButtons.module.scss';

export interface IFormButtonsProps{
    saveAction: () => Promise<boolean> | boolean;
    cancelAction: () => void;
}

export interface IFormButtonsState{

}

export default class FormButtons extends React.Component<IFormButtonsProps, IFormButtonsState>{
    constructor(props: IFormButtonsProps){
        super(props);
    }

    public render(){
        return (
            <div className={ styles.buttonContainer }>
                <DefaultButton text="Cancel" onClick={ this.cancelAction.bind(this) } />
                <PrimaryButton text="Save" onClick={ this.saveAction.bind(this) } />
            </div>
        )
    }

    private saveAction(){
        this.props.saveAction();
    }

    private cancelAction(){
        this.props.cancelAction();
    }
}