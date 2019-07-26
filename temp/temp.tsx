import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './temp.scss';

import { testFormDefinition } from './testData';

import { ReactJsonForm, EDisplayMode, PanelType } from '../src/index';

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';

const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker'
};

initializeIcons();

export interface ITestVariables{
  description: string;
  [key: string]: any;
}

const testVariables = {
  description: "test description"
}

ReactDOM.render(
  (
    <div className={ styles.container }>
      <DatePicker />
      <h3>Component Demo</h3>
      <hr />
      <ReactJsonForm<ITestVariables>
        definition={ testFormDefinition } 
        cancelAction={ cancelAction } 
        saveAction={ saveAction } 
        variables={ testVariables }
        displayMode={ EDisplayMode.plain }
        isOpen={ true }
        panelType={ PanelType.medium }
        onFormDataChange={ onChangeAction }
      />
    </div>
  ),
  document.getElementById("app")
);

function saveAction(formObject: any){
  console.log(formObject);
  return true;
}

function cancelAction(){
  console.log("Cancelled");
}

function onChangeAction(isValid: boolean, formData: object){
  console.log(`Valid: ${isValid}, Data: ${ JSON.stringify(formData, null, " ") }`)
}
