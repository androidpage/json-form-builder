# json-form-builder
This is a React component which will build a form from a JSON definition. Basically I got sick of writing complex forms in standard React with change event bindings etc. as I felt like I was perpetually repeating myself. This is the result of my laziness ;)

Note: This is the very first, largely unfinished version. There is no testing to speak of and lots of features I would like to implement. The core functionality does work but there's a lot left to do. You'll see some references to SharePoint in the form schema below - these are ignored for the moment. I started out building a SharePoint specific solution but decided to make the form builder it's own module and make a SharePoint version as an abstraction on top of it. I need to revise the schema; it's on the to-do list!

# Use
```jsx
// You can define a strongly typed variables array to pass into the form, this allows you to do things like pass in dynamically loaded dropdown lists. Variables in the schema are denoted like this: %description% - Note: letter case is important!

export interface ITestVariables{
  description: string;
}

const testVariables: ITestVariables = {
  description: "test description"
}

// Notice the <ITestVariables> below, this is passed into the form as a standard generic type

<ReactJsonForm<ITestVariables>
  definition={ testFormDefinition } // JSON form definition - this is validated against the below schemas before loading
  cancelAction={ () => false } // function to execute on cancel 
  saveAction={ (formValues: object) => doSomethingWithFormValues(formValues) }  // function to execute on save, the form values are passed to this function as an object
  variables={ testVariables } // Variables object of type passed into form
  displayMode={ EDisplayMode.plain } // Display mode - see below
  isOpen={ true } // If form is in "panel" display mode you need to tell it when to be open
  panelType={ PanelType.medium } // If form is in "panel" display mode you need to tell it what size to be
  theme={ theme } // You can pass an office-ui-fabric colour theme into the form to change the colours
/>
```

# Display Modes
```ts
export enum EDisplayMode{
    "normal" = "normal", // Display with coloured header and centered
    "panel" = "panel", // Display in Office UI React sidebar Panel
    "plain" = "plain" // Display without any form specific styling, designed to be rendered inside a styled container
}
```

# Form Schema
```json
{

    "$id": "https://pbo.vic.gov.au/schemas/form.schema.json", 
    "type": "object", 
    "properties": {
    "title": {
        "$id": "/properties/title", 
        "type": "string", 
        "title": "Displayed Form Title", 
        "default": "", 
        "examples": [
        "string"
        ]
    },
    "description":{
        "$id": "/properties/description",
        "type":"string",
        "title":"Displayed form description",
        "default":"",
        "examples": [
            "Please fill the below form, then click submit."
        ]
    },
    "siteUrl":{
        "$id":"/properties/siteUrl",
        "type":"string",
        "title":"SharePoint Site URL",
        "examples":[
            "https://{TENNANCY}.sharepoint.com/sites/{SITENAME}"
        ]
    },
    "allowDraft":{
        "$id":"/properties/allowDraft",
        "type":"boolean",
        "title":"Allow saving as draft. Requires a boolean type column named 'Draft' or specified in draftField in list",
        "default":false
    },
    "draftField":{
        "$id":"/properties/draftField",
        "type":"string",
        "title":"The name of the boolean list column which stores whether or not a record is a draft",
        "default":"Draft",
        "examples":[
            "Draft",
            "isDraft"
        ]
    },
    "formLinkValue":{
        "$id":"/properties/formLinkValue",
        "type":"string",
        "title":"Custom path to list item form, column values can be inserted using square brackets and the field name eg. [Id]",
        "default":"",
        "examples":[
            "/forms/myformname/[id]",
            "https://example.com/forms/myformname/[id]"
        ]
    },
    "formLinkField":{
        "$id":"/properties/formLinkField",
        "type":"string",
        "title":"The name of the string list column in which to save a custom link to the list item.",
        "default":"FormLink",
        "examples":[
            "FormLink"
        ]
    },
    "readOnlyFieldName":{
        "$id":"/properties/readOnlyFieldName",
        "type":"string",
        "title":"Name of field to check for values which mark form as read only",
        "default":"ReadOnly",
        "examples":[
            "ReadOnly",
            "Status"
        ]
    },
    "readOnlyFieldValues":{
        "$id":"/properties/readOnlyFieldName",
        "type":"string",
        "title":"Value of field to check for values which mark form as read only",
        "default":"True",
        "examples":[
            "Read Only"
        ]
    },
    "allowWriteFieldName":{
        "$id":"/properties/readOnlyFieldName",
        "type":"string",
        "title":"Name of field to check for values which mark form allow editing",
        "default":"ReadOnly",
        "examples":[
            "ReadOnly",
            "Status",
            "AllowEdit"
        ]
    },
    "allowWriteFieldValues":{
        "$id":"/properties/readOnlyFieldName",
        "type":"string",
        "title":"Value of field to check for values which mark form allow editing",
        "default":"True",
        "examples":[
            "Allow Editing"
        ]
    },
    "listName": {
        "$id": "/properties/listName",
        "type": "string",
        "title": "SharePoint List Name",
        "default": "",
        "examples": [
            "MyList",
            "My List",
            "My_List"
        ]
    }, 
    "sections": {
        "type": "array", 
        "items": {
        "type": "object", 
            "properties": {
                "title": {
                    "type": "string", 
                    "title": "The section Title", 
                    "default": "", 
                    "examples": [
                        "Section 1.",
                        "Contact Information"
                    ]
                },
                "description":{
                    "type":"string",
                    "title":"Section description",
                    "default":""
                },
                "columns":{
                    "type": "integer",
                    "title": "Number of grid columns to split fields across",
                    "default": 1
                },
                "fields": {
                    "type": "array", 
                    "title": "The fields in this section",
                        "items":{
                            "$ref": "field.schema.json"
                        },
                        "default":[]
                }
            }
        }
    }, 
    "fields": {
        "type": "array", 
            "title": "The fields in this section",
                "items":{
                    "$ref": "field.schema.json"
                },
                "default":{}
    }, 
    "validators": {
        "$id": "/properties/validators", 
        "type": "array", 
        "items": {
        "$id": "/properties/validators/items", 
        "type": "object", 
        "properties": {
            "name": {
            "$id": "/properties/validators/items/properties/name", 
            "type": "string", 
            "title": "The validator name", 
            "default": "", 
            "examples": [
                "CharLimit255"
            ]
            }, 
            "regex": {
            "$id": "/properties/validators/items/properties/regex", 
            "type": "string", 
            "title": "The Regex validation string", 
            "default": "", 
            "examples": [
                "^.{0,255}$"
            ]
            },
            "errorMessage": {
                "$id": "/properties/validators/items/properties/errorMessage", 
                "type": "string", 
                "title": "The validation error message to display",
                "default": "A validation error has ocurred",
                "examples":[
                    "Error: Please keep this field below 255 characters in length"
                ]
            }
        }
        }
    }
    }, 
    "required": [
        "title",
        "listName"
    ]
}
```

# Field Schema
```json
{
    "$id": "https://pbo.vic.gov.au/schemas/field.schema.json",  
    "type": "object", 
    "properties": {
        "label": {
            "$id": "/properties/label", 
            "type": "string", 
            "title": "The Label Schema", 
            "default": "", 
            "examples": [
            "Field Title",
            "First Name",
            "Email Address"
            ]
        }, 
        "type": {
            "$id": "/properties/type",
            "type": "string", 
            "enum": [
                "text", 
                "multiline-text", 
                "dropdown", 
                "date", 
                "datetime", 
                "choice",
                "uploader",
                "checkbox",
                "info-note",
                "grid-placeholder"
            ]
        }, 
        "fieldName": {
            "$id": "/properties/fieldName", 
            "type": "string", 
            "title": "The Fieldname Schema ", 
            "default": "", 
            "examples": [
            "string"
            ]
        }, 
        "placeholder": {
            "$id": "/properties/placeholder", 
            "type": "string", 
            "title": "The Placeholder Schema ", 
            "default": "", 
            "examples": [
            "string"
            ]
        }, 
        "default": {
            "$id": "/properties/default", 
            "type": "string", 
            "title": "The Default Schema ", 
            "default": "", 
            "examples": [
            "string"
            ]
        }, 
        "options": {
            "$id": "/properties/options", 
            "type": "array", 
            "items": {
            "$id": "/properties/options/items", 
            "type": "object", 
            "properties": {
                "key": {
                    "$id": "/properties/options/items/properties/key", 
                    "type": "string",
                    "title": "The Key Schema ", 
                    "default": 0, 
                    "examples": [
                        1
                    ]
                }, 
                "text": {
                    "$id": "/properties/options/items/properties/value", 
                    "type": "string", 
                    "title": "The Value Schema ", 
                    "default": "", 
                    "examples": [
                        "string"
                    ]
                }
            }
            }
        }, 
        "lookupList": {
            "$id": "/properties/lookupList", 
            "type": "string", 
            "title": "The Lookuplist Schema ", 
            "default": "", 
            "examples": [
            "string"
            ]
        }, 
        "keyField": {
            "$id": "/properties/keyField", 
            "type": "string", 
            "title": "The Keyfield Schema ", 
            "default": "", 
            "examples": [
            "string"
            ]
        }, 
        "valueField": {
            "$id": "/properties/valueField", 
            "type": "string", 
            "title": "The Valuefield Schema ", 
            "default": "", 
            "examples": [
            "string"
            ]
        }, 
        "orderBy": {
            "$id": "/properties/orderBy", 
            "type": "string", 
            "title": "Order lookup dropdown options by which field", 
            "default": "",
            "examples": [
                "Title",
                "Created"
            ]
        },
        "storeValue":{
            "$id": "/properties/storeValue", 
            "type": "string", 
            "title": "Save the value or key to SharePoint?", 
            "default": "key",
            "enum": [
                "key",
                "valued"
            ],
            "examples": [
                "key",
                "valued"
            ]
        },
        "validator": {
            "$id": "/properties/validator", 
            "type": "string", 
            "title": "The Validator Schema ", 
            "default": "", 
            "examples": [
            "string"
            ]
        }, 
        "required": {
            "$id": "/properties/required", 
            "type": "boolean", 
            "title": "The Required Schema ", 
            "default": false, 
            "examples": [
            true
            ]
        },
        "columnSpan":{
            "$id": "/properties/columnSpan", 
            "type": "integer", 
            "title": "The number of grid columns to span", 
            "default": 1
        },
        "styleString":{
            "$id": "/properties/columnSpan", 
            "type": "string",
            "title":"Stringified JSON styles",
            "examples": [
                "{\"backgroundColor\": \"blue\"}"
            ]
        },
        "dontSave":{
            "$id": "/properties/dontSave", 
            "type": "boolean", 
            "title": "Don't save this field, use for templating purposes such as hiding or showing fields", 
            "default": false, 
            "examples": [
            true
            ]
        },
        "prefix":{
            "$id": "/properties/prefix", 
            "type": "string",
            "title":"Field prefix value",
            "examples": [
                "$",
                "Monthly:"
            ]
        },
        "suffix":{
            "$id": "/properties/suffix", 
            "type": "string",
            "title":"Field suffix value",
            "examples": [
                "Kg",
                "Km/Hr"
            ]
        },
        "min":{
            "$id": "/properties/min", 
            "type": ["integer", "string"],
            "title":"Field minimum value",
            "examples":[
                1,
                100,
                "1/1/2018"
            ]
        },
        "max":{
            "$id": "/properties/min", 
            "type": ["integer", "string"],
            "title":"Field maximum value",
            "examples":[
                1,
                100,
                "1/1/2018"
            ]
        },
        "visibleIf":{
            "$id":"/properties/visibleIf",
            "type":"array",
            "title":"Conditional to hide the field",
            "items": {
                "type":"object",
                "properties": {
                    "operator":{
                          "$id":"/properties/visibleIf/operator",
                          "type":"string",
                          "enum":[
                              "==",
                              "!=",
                              "<=",
                              ">=",
                              "<",
                              ">"
                          ]
                    },
                    "field":{
                        "$id":"/properties/visibleIf/field",
                        "type":"string",
                        "title":"Name of field to check",
                        "examples":[
                            "Title"
                        ]
                    },
                    "value":{
                        "$id":"/properties/visibleIf/field",
                        "type":"string",
                        "title":"Value to check",
                        "examples":[
                            "Item Title"
                        ]
                    }
                },
                "required": [
                    "operator",
                    "field",
                    "value"
                ]
            }
        }
    },
    "required": []
}
```
