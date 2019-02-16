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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var Styling_1 = require("office-ui-fabric-react/lib/Styling");
var React = require("react");
var Defaults_1 = require("../shared/Defaults");
var DisplayMode_1 = require("../shared/DisplayMode");
var Replacer_1 = require("../shared/Replacer");
var SchemaValidator_1 = require("../shared/SchemaValidator");
var FormBody_1 = require("./FormBody/FormBody");
var FormButtons_1 = require("./FormButtons/FormButtons");
var styles = require("./ReactJsonForm.module.scss");
var fieldDef = require("../schemas/field.schema.json");
var formDef = require("../schemas/form.schema.json");
var ReactJsonForm = /** @class */ (function (_super) {
    __extends(ReactJsonForm, _super);
    function ReactJsonForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            definition: null,
            formObject: {},
            isValid: false,
        };
        var theme = _this.props.theme || Defaults_1.default.theme;
        if (theme) {
            Styling_1.loadTheme(theme);
        }
        return _this;
    }
    ReactJsonForm.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var validator, isValid, definition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validator = new SchemaValidator_1.SchemaValidator([formDef, fieldDef]);
                        return [4 /*yield*/, validator.validate(this.props.definition)];
                    case 1:
                        isValid = _a.sent();
                        definition = this.fillDefinitionVars.bind(this)();
                        if (!isValid) {
                            console.log(validator.getErrors());
                        }
                        this.setState({
                            definition: definition,
                            isValid: isValid
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactJsonForm.prototype.render = function () {
        var containerStyle = {
            maxWidth: this.props.maxWidth || Defaults_1.default.maxWidth
        };
        var def = this.state.definition;
        if (def !== null) {
            switch (this.props.displayMode) {
                case DisplayMode_1.EDisplayMode.panel: {
                    return (React.createElement(Panel_1.Panel, { isOpen: this.props.isOpen || false, headerText: def.title, type: this.props.panelType || Defaults_1.default.panelType, onRenderHeader: this.customPanelHeaderRenderer.bind(this) },
                        React.createElement(FormBody_1.default, { fieldChangeHandler: this.handleFieldChange.bind(this), definition: def }),
                        React.createElement("div", { className: styles.formFooter },
                            React.createElement(FormButtons_1.default, { cancelAction: this.cancelAction.bind(this), saveAction: this.saveAction.bind(this) }))));
                }
                case DisplayMode_1.EDisplayMode.plain: {
                    return (React.createElement("div", null,
                        React.createElement(FormBody_1.default, { fieldChangeHandler: this.handleFieldChange.bind(this), definition: def })));
                }
                default: {
                    return (React.createElement("div", { style: containerStyle, className: styles.formContainer },
                        React.createElement("div", { className: styles.formHeader },
                            React.createElement("h2", null, def.title),
                            React.createElement("p", null, def.description)),
                        React.createElement("div", { className: styles.bodyPadding },
                            React.createElement(FormBody_1.default, { fieldChangeHandler: this.handleFieldChange.bind(this), definition: def })),
                        React.createElement("div", { className: styles.formFooter },
                            React.createElement(FormButtons_1.default, { cancelAction: this.cancelAction.bind(this), saveAction: this.saveAction.bind(this) }))));
                }
            }
        }
        else {
            return (React.createElement(Spinner_1.Spinner, { label: "Loading form..." }));
        }
    };
    ReactJsonForm.prototype.customPanelHeaderRenderer = function (props, defaultRenderer) {
        var def = this.state.definition;
        var description = def ? def.description : false;
        return (React.createElement("div", null,
            defaultRenderer ? defaultRenderer(props) : "",
            description && (React.createElement("p", { className: styles.panelDescription }, description))));
    };
    ReactJsonForm.prototype.handleFieldChange = function (fieldObject) {
        var formObject = this.state.formObject;
        Object.assign(formObject, fieldObject);
        this.setState({
            formObject: formObject
        });
    };
    ReactJsonForm.prototype.getRequiredFields = function (definition) {
        if (definition) {
            var sectionFields = definition.sections ? definition.sections.map(function (s) { return s.fields; }).reduce(function (prev, curr) { return prev.concat(curr); }) : [];
            var discreteFields = definition.fields ? definition.fields : [];
            var fields = sectionFields.concat(discreteFields);
            var requiredFields = fields.filter(function (field) { return field.required; });
            return requiredFields;
        }
    };
    ReactJsonForm.prototype.checkRequiredFields = function (formObject, requiredFields) {
        if (requiredFields) {
            var requiredFieldNames = requiredFields.map(function (field) { return field.fieldName; });
            var invalidFields = requiredFields.map(function (field) {
                if (field.fieldName) {
                    return formObject[field.fieldName] === undefined || formObject[field.fieldName] === null || formObject[field.fieldName] === "";
                }
                else {
                    return false;
                }
            }).filter(function (field) { return field; });
            return invalidFields.length <= 0;
        }
        else {
            return true;
        }
    };
    ReactJsonForm.prototype.fillDefinitionVars = function () {
        var def = this.props.definition;
        var vars = this.props.variables;
        if (vars) {
            var rep = function (key, val) {
                return Replacer_1.replacer(vars, key, val);
            };
            var stringified = JSON.stringify(def, rep);
            return JSON.parse(stringified);
        }
        return def;
    };
    ReactJsonForm.prototype.saveAction = function () {
        var requiredFields = this.getRequiredFields(this.props.definition);
        var isValid = this.checkRequiredFields(this.state.formObject, requiredFields);
        if (isValid) {
            return this.props.saveAction(this.state.formObject);
        }
        return false;
    };
    ReactJsonForm.prototype.cancelAction = function () {
        this.props.cancelAction();
    };
    return ReactJsonForm;
}(React.Component));
exports.ReactJsonForm = ReactJsonForm;
//# sourceMappingURL=ReactJsonForm.js.map