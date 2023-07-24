"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSelfClosedFields = void 0;
function removeSelfClosedFields(o) {
    Object.keys(o).forEach(key => {
        if (o[key] !== null && typeof o[key] === 'object') {
            removeSelfClosedFields(o[key]);
            return;
        }
        if (o[key] === undefined || o[key] === '' || o[key] === null) {
            delete o[key];
        }
    });
}
exports.removeSelfClosedFields = removeSelfClosedFields;
//# sourceMappingURL=remove-self-closed-fields.js.map