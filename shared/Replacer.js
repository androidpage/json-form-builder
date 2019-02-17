"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replacer(variables, key, val) {
    var regex = /%[\w\d]+%/g;
    if (typeof (val) === "string") {
        var newVal_1 = val;
        var matches = newVal_1.match(regex);
        if (matches) {
            matches.forEach(function (match) {
                var variable = variables[match.replace(/%/g, '')];
                newVal_1 = newVal_1.replace(match, variable);
            });
            return newVal_1;
        }
        else {
            return val;
        }
    }
    return val;
}
exports.replacer = replacer;
//# sourceMappingURL=Replacer.js.map