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
var React = require("react");
var react_dropzone_1 = require("react-dropzone");
var Uploader = /** @class */ (function (_super) {
    __extends(Uploader, _super);
    function Uploader(props) {
        return _super.call(this, props) || this;
    }
    Uploader.prototype.render = function () {
        return (React.createElement(react_dropzone_1.default, { onDrop: this.onDrop }, function (_a) {
            var getRootProps = _a.getRootProps;
            return (React.createElement("div", __assign({}, getRootProps()),
                React.createElement("span", null, "Drop files here to upload...")));
        }));
    };
    Uploader.prototype.onDrop = function (files) {
        console.log(files);
    };
    return Uploader;
}(React.Component));
exports.default = Uploader;
//# sourceMappingURL=Uploader.js.map