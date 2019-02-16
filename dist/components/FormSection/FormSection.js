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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var FormField_1 = require("../FormField/FormField");
var FormSection = /** @class */ (function (_super) {
    __extends(FormSection, _super);
    function FormSection(props) {
        return _super.call(this, props) || this;
    }
    FormSection.prototype.render = function () {
        return (React.createElement("div", null,
            this.props.definition.title && (React.createElement("h3", null, this.props.definition.title)),
            this.props.definition.description && (React.createElement("span", null, this.props.definition.description)),
            this.props.definition.fields && this.props.definition.fields.map(function (field) {
                return (React.createElement(FormField_1.default, { definition: field }));
            })));
    };
    return FormSection;
}(React.Component));
exports.default = FormSection;
//# sourceMappingURL=FormSection.js.map