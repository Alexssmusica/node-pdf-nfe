"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonOneLevel = void 0;
function jsonOneLevel(obj) {
    const result = {};
    for (const k of Object.keys(obj)) {
        let logStr = obj[k].toString() ?? 'null';
        if (logStr.length > 500) {
            logStr = logStr.substring(0, 499);
        }
        result[k] = logStr;
    }
    return JSON.stringify(result);
}
exports.jsonOneLevel = jsonOneLevel;
//# sourceMappingURL=json-one-level.js.map