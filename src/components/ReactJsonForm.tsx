import { IPanelHeaderRenderer, IPanelProps, Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { IPartialTheme, loadTheme } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import { IFieldDefinition } from '../interfaces/field.interface';
import { IFormDefinition, IFormSectionDefinition } from '../interfaces/form.interface';
import defaults from '../shared/Defaults';
import { EDisplayMode } from '../shared/DisplayMode';
import { replacer } from '../shared/Replacer';
import { SchemaValidator } from '../shared/SchemaValidator';
import FormBody from './FormBody/FormBody';
import FormButtons from './FormButtons/FormButtons';
import * as styles from './ReactJsonForm.module.scss';

import fieldDef = require('../schemas/field.schema.json');
import formDef = require('../schemas/form.schema.json');

export interface IReactJsonFormProps<T extends object = {}>{
  definition: IFormDefinition;
  maxWidth?: number; // Unused at the moment
  theme?: IPartialTheme;
  displayMode?: EDisplayMode;
  isOpen?: boolean;
  panelType?: PanelType;
  // Save function, return a boolean so form can display either success or failure message
  saveAction: (formObject: any) => boolean | Promise<boolean>;
  cancelAction: () => void;
  onFormDataChange?: (formIsValid: boolean, formData: object) => void;
  successMessage?: string;
  failMessage?: string;
  // Dynamic form data array - this is for dynamically loaded dropdown values etc.
  // Definition will need some sort of variable delimiter. Maybe a symbol like @ or $ at the start
  // Using generic types we can require that the dev using the form specifies the variables array/object type
  // eg.  <ReactJsonForm<ITestVariables> variables={ object of type ITestVariable } >
  // default of {} still allows normal use without dynamic variables
  variables?: T;
}

export interface IReactJsonFormState{
  definition: IFormDefinition | null;
  formObject: object;
  isValid: boolean;
}

export class ReactJsonForm<T extends object = {}> extends React.Component<IReactJsonFormProps<T>, IReactJsonFormState>{

  constructor(props: IReactJsonFormProps<T>){
    super(props);

    this.state = {
      definition: null,
      formObject: {},
      isValid: false,
    }

    const theme = this.props.theme || defaults.theme;
    if(theme){
      loadTheme(theme);
    }
  }

  public async componentDidMount(){
    // ## Validate form JSON matches the schema ## //
    const validator = new SchemaValidator([formDef, fieldDef]);
    const isValid = await validator.validate(this.props.definition);
    const definition = this.fillDefinitionVars.bind(this)();

    if(!isValid){
      console.log(validator.getErrors());
    }
    this.setState({
      definition,
      isValid
    });

  }

  public render(){
    const containerStyle: React.CSSProperties = {
      maxWidth: this.props.maxWidth || defaults.maxWidth
    }

    const def: IFormDefinition | null = this.state.definition;

    if(def !== null){
      switch(this.props.displayMode){
        case EDisplayMode.panel: {
          return(
            <Panel isOpen={ this.props.isOpen || false } headerText={ def.title } type={ this.props.panelType || defaults.panelType } onRenderHeader={ this.customPanelHeaderRenderer.bind(this) }>
                <FormBody fieldChangeHandler={ this.handleFieldChange.bind(this) } definition={ def } />
                <div className={ styles.formFooter }>
                    <FormButtons cancelAction={ this.cancelAction.bind(this) } saveAction={ this.saveAction.bind(this) } />
                </div>
            </Panel>
          );
        }
        case EDisplayMode.plain: {
          return(
            <div>
              <FormBody fieldChangeHandler={ this.handleFieldChange.bind(this) } definition={ def } />
            </div>
          )
        }
        default: {
          return(
            <div style={ containerStyle } className={ styles.formContainer }>
              <div className={ styles.formHeader } >
                <h2>{ def.title }</h2>
                <p>{ def.description }</p>
              </div>
              <div className={ styles.bodyPadding }>
                <FormBody fieldChangeHandler={ this.handleFieldChange.bind(this) } definition={ def } />
              </div>
              <div className={ styles.formFooter }>
                <FormButtons cancelAction={ this.cancelAction.bind(this) } saveAction={ this.saveAction.bind(this) } />
              </div>
            </div>
          );
        }
      }
    }
    else{
      return(
        <Spinner label="Loading form..." />
      );
    }
  }

  public save(){
    return this.saveAction();
  }

  private customPanelHeaderRenderer(props?: IPanelProps, defaultRenderer?: IPanelHeaderRenderer){
      const def = this.state.definition;
      const description = def ? def.description : false;
        return(
            <div>
                {
                    defaultRenderer ? defaultRenderer(props) : ""
                }
                {
                    description && (
                        <p className={ styles.panelDescription }>{ description }</p>
                    )
                }
            </div>
        )
  }

  private handleFieldChange(fieldObject: object): void{
    const formObject = this.state.formObject;
    Object.assign(formObject, fieldObject);

    const isValid = this.formIsValid();
    
    this.setState({
      formObject
    });

    if(this.props.onFormDataChange){
      this.props.onFormDataChange(isValid, formObject);
    }
  }

  private getRequiredFields(definition: IFormDefinition){
    if(definition){
      const sectionFields: IFieldDefinition[] = definition.sections ? definition.sections.map(s => s.fields).reduce((prev, curr) => prev.concat(curr)) : [];
      const discreteFields:IFieldDefinition[] = definition.fields ? definition.fields : [];
      const fields: IFieldDefinition[] = sectionFields.concat(discreteFields);

      const requiredFields = fields.filter((field) => field.required);
      return requiredFields;
    }
  }

  private checkRequiredFields(formObject: any, requiredFields?: IFieldDefinition[]): boolean{
    if(requiredFields){
      const requiredFieldNames = requiredFields.map(field => field.fieldName);
      const invalidFields = requiredFields.map((field: IFieldDefinition) => {
        if(field.fieldName){
          return formObject[field.fieldName] === undefined || formObject[field.fieldName] === null || formObject[field.fieldName] === "";
        }
        else{
          return false;
        }
      }).filter((field: boolean) => field)
  
      return invalidFields.length <= 0;
    }
    else{
      return true;
    }
  }

  private fillDefinitionVars(): IFormDefinition{
    const def: IFormDefinition = this.props.definition;
    const vars: T | undefined = this.props.variables;

    if(vars){
      const rep: (key: string, val: any) => (vars: T, key: string, val: any) => string = (key: string, val: any) => {
        return replacer<T>(vars, key, val);
      }
      const stringified: string = JSON.stringify(def, rep);
      return JSON.parse(stringified);
    }

    return def;
  }

  private formIsValid(): boolean{
    const requiredFields: IFieldDefinition[] | undefined = this.getRequiredFields(this.props.definition);
    const isValid = this.checkRequiredFields(this.state.formObject, requiredFields);

    return isValid;
  }

  private saveAction(): boolean | Promise<boolean>{
    const requiredFields: IFieldDefinition[] | undefined = this.getRequiredFields(this.props.definition);
    const isValid = this.checkRequiredFields(this.state.formObject, requiredFields);

    if(isValid){
      return this.props.saveAction(this.state.formObject)
    }
    return false;
  }

  private cancelAction(){
    this.props.cancelAction();
  }
}