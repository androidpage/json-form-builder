import * as React from 'react';
import { IFieldDefinition } from '../../interfaces/field.interface';
import { IFormSectionDefinition } from '../../interfaces/form.interface';

import FormField from '../FormField/FormField';

export interface IFormSectionProps{
  definition: IFormSectionDefinition;
}

export interface IFormSectionState{

}

export default class FormSection extends React.Component<IFormSectionProps, IFormSectionState>{
  constructor(props: IFormSectionProps){
    super(props);
  }

  public render(){
    return(
      <div>
        { this.props.definition.title && ( <h3>{ this.props.definition.title }</h3> ) }
        { this.props.definition.description && (<span>{ this.props.definition.description }</span>) }
        {
            this.props.definition.fields && this.props.definition.fields.map((field: IFieldDefinition) => {
              return (
                <FormField definition={ field } />
              )
            })
          }
      </div>
    )
  }

}