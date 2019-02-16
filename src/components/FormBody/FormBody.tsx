import * as React from 'react';
import { IFieldDefinition } from '../../interfaces/field.interface';
import { IFormDefinition, IFormSectionDefinition } from '../../interfaces/form.interface';
import * as styles from './FormBody.module.scss';
import FormField from '../FormField/FormField';
import FormSection from '../FormSection/FormSection';

export interface IFormBodyProps{
    definition: IFormDefinition;
    fieldChangeHandler: (fieldObject: object) => void;
}

export interface IFormBodyState{

}

export default class FormBody extends React.Component<IFormBodyProps, IFormBodyState>{
    public render(){
        const def: IFormDefinition = this.props.definition;

        return(
            <div className={ styles.formBody }>
            {
              def.fields && def.fields.map((field: IFieldDefinition) => {
                return (
                  <FormField definition={ field } onFieldChange={ this.props.fieldChangeHandler } />
                )
              })
            }
            {
              def.sections && def.sections.map((section: IFormSectionDefinition) => {
                return (
                  <FormSection definition={ section } />
                )
              })
            }
          </div>
        );
    }
}