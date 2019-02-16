import { IFormDefinition } from '../src/index';

export const testFormDefinition: IFormDefinition = {
    "$schema": "../src/schemas/form.schema.json",
    "listName": "Policy Costing Requests",
    "title":"React JSON Form Demo",
    "description": "%description%",
    "fields": [
        {
            "type": "checkbox",
            "label": "Checkbox",
            "fieldName": "checkbox"
        },
        {
            "type": "choice",
            "label": "Choice",
            "fieldName": "choice",
            "required": true,
            "storeValue": "key",
            "options": [
                {
                    "key": "0",
                    "text": "Choice 1"
                },
                {
                    "key": "1",
                    "text": "Choice 2"
                },
                {
                    "key": "2",
                    "text": "Choice 3"
                },
                {
                    "key": "3",
                    "text": "Choice 4"
                }
            ]
        },
        {
            "type": "date",
            "label": "Date",
            "fieldName": "date"
        },
        {
            "type": "datetime",
            "label": "Date and Time",
            "fieldName": "datetime"
        },
        {
            "type": "dropdown",
            "label": "Dropdown",
            "fieldName": "dropdown",
            "options": [
                {
                    "key": "0",
                    "text": "Choice 1"
                },
                {
                    "key": "1",
                    "text": "Choice 2"
                },
                {
                    "key": "2",
                    "text": "Choice 3"
                },
                {
                    "key": "3",
                    "text": "Choice 4"
                }
            ]
        },
        {
            "type": "text",
            "label": "Single Line Text",
            "fieldName": "text"
        },
        {
            "type": "multiline-text",
            "label": "Multiline Text",
            "fieldName": "multiline"
        },
        {
            "type":"uploader",
            "label": "Uploader"
        }
    ],
    "validators": [
        {
            "name": "email",
            "regex": "^(.+[@].+[.].+)$",
            "errorMessage": "Please enter a valid email"
        },{
            "name":"number",
            "regex":"^(\\d)+$",
            "errorMessage": "Please only enter numbers in this field"
        }
    ]
}