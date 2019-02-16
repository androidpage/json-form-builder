"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EFieldType;
(function (EFieldType) {
    EFieldType["text"] = "text";
    EFieldType["multiline-text"] = "multiline-text";
    EFieldType["dropdown"] = "dropdown";
    EFieldType["date"] = "date";
    EFieldType["datetime"] = "datetime";
    EFieldType["choice"] = "choice";
    EFieldType["uploader"] = "uploader";
    EFieldType["checkbox"] = "checkbox";
    EFieldType["info-note"] = "info-note";
    EFieldType["grid-placeholder"] = "grid-placeholder";
})(EFieldType = exports.EFieldType || (exports.EFieldType = {}));
var EStoreValue;
(function (EStoreValue) {
    EStoreValue[EStoreValue["key"] = 0] = "key";
    EStoreValue[EStoreValue["value"] = 1] = "value";
})(EStoreValue = exports.EStoreValue || (exports.EStoreValue = {}));
var EVisibleIfOperators;
(function (EVisibleIfOperators) {
    EVisibleIfOperators[EVisibleIfOperators["=="] = 0] = "==";
    EVisibleIfOperators[EVisibleIfOperators["!="] = 1] = "!=";
    EVisibleIfOperators[EVisibleIfOperators["<="] = 2] = "<=";
    EVisibleIfOperators[EVisibleIfOperators[">="] = 3] = ">=";
    EVisibleIfOperators[EVisibleIfOperators["<"] = 4] = "<";
    EVisibleIfOperators[EVisibleIfOperators[">"] = 5] = ">";
})(EVisibleIfOperators = exports.EVisibleIfOperators || (exports.EVisibleIfOperators = {}));
function choiceFromOption(option) {
    return {
        key: option.key.toString(),
        text: option.text,
    };
}
exports.choiceFromOption = choiceFromOption;
//# sourceMappingURL=field.interface.js.map