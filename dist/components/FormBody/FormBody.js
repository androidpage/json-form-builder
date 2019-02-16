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
var styles = require("./FormBody.module.scss");
var FormField_1 = require("../FormField/FormField");
var FormSection_1 = require("../FormSection/FormSection");
var FormBody = /** @class */ (function (_super) {
    __extends(FormBody, _super);
    function FormBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormBody.prototype.render = function () {
        var _this = this;
        var def = this.props.definition;
        return (React.createElement("div", { className: styles.formBody },
            def.fields && def.fields.map(function (field) {
                return (React.createElement(FormField_1.default, { definition: field, onFieldChange: _this.props.fieldChangeHandler }));
            }),
            def.sections && def.sections.map(function (section) {
                return (React.createElement(FormSection_1.default, { definition: section }));
            })));
    };
    return FormBody;
}(React.Component));
exports.default = FormBody;
//# sourceMappingURL=FormBody.js.map