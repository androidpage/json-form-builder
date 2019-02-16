import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './temp.scss';

import { testFormDefinition } from './testData';

import { ReactJsonForm, EDisplayMode, PanelType } from '../dist/index';

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

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
