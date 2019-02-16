import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupProps } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { DatePicker, IDatePickerProps } from 'office-ui-fabric-react/lib/DatePicker';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { ITextFieldProps, TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { choiceFromOption, EFieldType, IFieldDefinition, IOption } from '../../interfaces/field.interface';
import { DayPickerStrings } from '../../shared/DatePicker';
import Uploader from '../Uploader/Uploader';

import * as styles from './FormField.module.scss';

export interface IFormFieldProps{
  definition: IFieldDefinition;
  onFieldChange?: (fieldValue: object) => void;
}

export interface IFormFieldState{

}

export default class FormField extends React.Component<IFormFieldProps, IFormFieldState>{
  constructor(props: IFormFieldProps){
    super(props);
  }

  public render(){
    const def = this.props.definition;

    switch(def.type){
      case EFieldType.checkbox: {
        const options: ICheckboxProps = {
          className: styles.checkboxField,
          disabled: def.readOnly || false,
          label: this.props.definition.label,
          onChange: this.onFieldChange.bind(this),
        }
        return (
          <div className={ styles.formFieldContainer }>
            <Checkbox { ...options } />
          </div>
        )
      }

      case EFieldType.choice: {
        const options: IChoiceGroupProps = {
          disabled: def.readOnly || false,
          label: def.label,
          onChange: this.onFieldChange.bind(this),
          options: this.getOptions().map((option) => choiceFromOption(option)),
          required: def.required || false
        }
        return (
          <div className={ styles.formFieldContainer }>
            <ChoiceGroup { ...options } />
          </div>
        )
      }

      case EFieldType.date: {
        const options: IDatePickerProps = {
          disabled: def.readOnly || false,
          isRequired: def.required || false,
          label: def.label,
          onSelectDate: this.onFieldChange.bind(this, undefined),
          strings: DayPickerStrings,
        }
        return (
          <div className={ styles.formFieldContainer }>
            <DatePicker { ...options } />
          </div>
        )
      }

      case EFieldType.datetime: {
        const options: IDatePickerProps = {
          disabled: def.readOnly || false,
          isRequired: def.required || false,
          label: def.label,
          onSelectDate: this.onFieldChange.bind(this, undefined),
          strings: DayPickerStrings,
        }
        return (
          <div className={ styles.formFieldContainer }>
            <DatePicker { ...options } />
            <Slider className={ styles.dateTimeSlider } label="Hour" min={ 1 } max={ 24 } />
            <Slider className={ styles.dateTimeSlider } label="Minute" min={ 0 } max={ 60 } />
          </div>
        )
      }

      case EFieldType.dropdown: {
        const options: IDropdownProps = {
          disabled: def.readOnly || false,
          label: def.label,
          onChanged: this.onFieldChange.bind(this, undefined),
          options: this.getOptions(),
          required: def.required || false
        }

        return (
          <Dropdown { ...options } />
        )
      }

      case EFieldType["grid-placeholder"]: {
        return(
          <span data-grid-placeholder >&nbsp;</span>
        )
      }

      case EFieldType["info-note"]: {
        return(
          <span>{ def.label }</span>
        )
      }

      case EFieldType["multiline-text"]: {
        const options: ITextFieldProps = {
          disabled: def.readOnly || false,
          label: this.props.definition.label,
          multiline: true,
          onChanged: this.onFieldChange.bind(this, undefined),
          required: def.required
        }
        return(
          <div className={ styles.formFieldContainer }>
            <TextField { ...options } />
          </div>
        )
      }

      case EFieldType.text: {
        const options: ITextFieldProps = {
          disabled: def.readOnly || false,
          label: this.props.definition.label,
          multiline: false,
          onChanged: this.onFieldChange.bind(this, undefined),
          required: def.required
        }
        return(
          <div className={ styles.formFieldContainer }>
            <TextField { ...options } />
          </div>
        )
      }

      case EFieldType.uploader: {
        return (
          <Uploader />
        )
      }

      default: {
        return(
          <span data-unsupported-field-type>&nbsp;</span>
        )
      }
    }
  }

  private onFieldChange(event: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, newVal: any): void{
    if(!this.props.definition.dontSave && this.props.definition.fieldName && this.props.onFieldChange){
      const res: any = {};

      if(typeof newVal === "object" && this.props.definition.storeValue){
        res[this.props.definition.fieldName] = newVal[this.props.definition.storeValue];
      }
      else{
        res[this.props.definition.fieldName] = newVal;
      }

      this.props.onFieldChange(res);
    }
  }
  
  // Probably move this to it's own module later
  private getOptions(): IOption[]{
    const errOption = [{ key: "error", text: "Error loading options."}];
    const options = this.props.definition.options;

    return options && options.length > 0 ? options : errOption;
  }
}