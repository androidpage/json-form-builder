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
var Button_1 = require("office-ui-fabric-react/lib/Button");
var styles = require("./FormButtons.module.scss");
var FormButtons = /** @class */ (function (_super) {
    __extends(FormButtons, _super);
    function FormButtons(props) {
        return _super.call(this, props) || this;
    }
    FormButtons.prototype.render = function () {
        return (React.createElement("div", { className: styles.buttonContainer },
            React.createElement(Button_1.DefaultButton, { text: "Cancel", onClick: this.cancelAction.bind(this) }),
            React.createElement(Button_1.PrimaryButton, { text: "Save", onClick: this.saveAction.bind(this) })));
    };
    FormButtons.prototype.saveAction = function () {
        this.props.saveAction();
    };
    FormButtons.prototype.cancelAction = function () {
        this.props.cancelAction();
    };
    return FormButtons;
}(React.Component));
exports.default = FormButtons;
//# sourceMappingURL=FormButtons.js.map