"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var ChoiceGroup_1 = require("office-ui-fabric-react/lib/ChoiceGroup");
var DatePicker_1 = require("office-ui-fabric-react/lib/DatePicker");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var Slider_1 = require("office-ui-fabric-react/lib/Slider");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var React = require("react");
var field_interface_1 = require("../../interfaces/field.interface");
var DatePicker_2 = require("../../shared/DatePicker");
var Uploader_1 = require("../Uploader/Uploader");
var styles = require("./FormField.module.scss");
var FormField = /** @class */ (function (_super) {
    __extends(FormField, _super);
    function FormField(props) {
        return _super.call(this, props) || this;
    }
    FormField.prototype.render = function () {
        var def = this.props.definition;
        switch (def.type) {
            case field_interface_1.EFieldType.checkbox: {
                var options = {
                    className: styles.checkboxField,
                    disabled: def.readOnly || false,
                    label: this.props.definition.label,
                    onChange: this.onFieldChange.bind(this),
                };
                return (React.createElement("div", { className: styles.formFieldContainer },
                    React.createElement(Checkbox_1.Checkbox, __assign({}, options))));
            }
            case field_interface_1.EFieldType.choice: {
                var options = {
                    disabled: def.readOnly || false,
                    label: def.label,
                    onChange: this.onFieldChange.bind(this),
                    options: this.getOptions().map(function (option) { return field_interface_1.choiceFromOption(option); }),
                    required: def.required || false
                };
                return (React.createElement("div", { className: styles.formFieldContainer },
                    React.createElement(ChoiceGroup_1.ChoiceGroup, __assign({}, options))));
            }
            case field_interface_1.EFieldType.date: {
                var options = {
                    disabled: def.readOnly || false,
                    isRequired: def.required || false,
                    label: def.label,
                    onSelectDate: this.onFieldChange.bind(this, undefined),
                    strings: DatePicker_2.DayPickerStrings,
                };
                return (React.createElement("div", { className: styles.formFieldContainer },
                    React.createElement(DatePicker_1.DatePicker, __assign({}, options))));
            }
            case field_interface_1.EFieldType.datetime: {
                var options = {
                    disabled: def.readOnly || false,
                    isRequired: def.required || false,
                    label: def.label,
                    onSelectDate: this.onFieldChange.bind(this, undefined),
                    strings: DatePicker_2.DayPickerStrings,
                };
                return (React.createElement("div", { className: styles.formFieldContainer },
                    React.createElement(DatePicker_1.DatePicker, __assign({}, options)),
                    React.createElement(Slider_1.Slider, { className: styles.dateTimeSlider, label: "Hour", min: 1, max: 24 }),
                    React.createElement(Slider_1.Slider, { className: styles.dateTimeSlider, label: "Minute", min: 0, max: 60 })));
            }
            case field_interface_1.EFieldType.dropdown: {
                var options = {
                    disabled: def.readOnly || false,
                    label: def.label,
                    onChanged: this.onFieldChange.bind(this, undefined),
                    options: this.getOptions(),
                    required: def.required || false
                };
                return (React.createElement(Dropdown_1.Dropdown, __assign({}, options)));
            }
            case field_interface_1.EFieldType["grid-placeholder"]: {
                return (React.createElement("span", { "data-grid-placeholder": true }, "\u00A0"));
            }
            case field_interface_1.EFieldType["info-note"]: {
                return (React.createElement("span", null, def.label));
            }
            case field_interface_1.EFieldType["multiline-text"]: {
                var options = {
                    disabled: def.readOnly || false,
                    label: this.props.definition.label,
                    multiline: true,
                    onChanged: this.onFieldChange.bind(this, undefined),
                    required: def.required
                };
                return (React.createElement("div", { className: styles.formFieldContainer },
                    React.createElement(TextField_1.TextField, __assign({}, options))));
            }
            case field_interface_1.EFieldType.text: {
                var options = {
                    disabled: def.readOnly || false,
                    label: this.props.definition.label,
                    multiline: false,
                    onChanged: this.onFieldChange.bind(this, undefined),
                    required: def.required
                };
                return (React.createElement("div", { className: styles.formFieldContainer },
                    React.createElement(TextField_1.TextField, __assign({}, options))));
            }
            case field_interface_1.EFieldType.uploader: {
                return (React.createElement(Uploader_1.default, null));
            }
            default: {
                return (React.createElement("span", { "data-unsupported-field-type": true }, "\u00A0"));
            }
        }
    };
    FormField.prototype.onFieldChange = function (event, newVal) {
        if (!this.props.definition.dontSave && this.props.definition.fieldName && this.props.onFieldChange) {
            var res = {};
            if (typeof newVal === "object" && this.props.definition.storeValue) {
                res[this.props.definition.fieldName] = newVal[this.props.definition.storeValue];
            }
            else {
                res[this.props.definition.fieldName] = newVal;
            }
            this.props.onFieldChange(res);
        }
    };
    // Probably move this to it's own module later
    FormField.prototype.getOptions = function () {
        var errOption = [{ key: "error", text: "Error loading options." }];
        var options = this.props.definition.options;
        return options && options.length > 0 ? options : errOption;
    };
    return FormField;
}(React.Component));
exports.default = FormField;
//# sourceMappingURL=FormField.js.map