"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
function log(msg, processo) {
    console.log(`[node-dfe][${processo ?? 'log'}]->${msg}`);
}
exports.log = log;
//# sourceMappingURL=log.js.map