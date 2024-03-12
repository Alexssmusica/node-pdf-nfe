"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = void 0;
async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.timeout = timeout;
//# sourceMappingURL=timeout.js.map