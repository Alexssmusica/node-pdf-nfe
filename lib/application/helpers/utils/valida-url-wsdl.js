"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaUrlWsdl = void 0;
function validaUrlWsdl(url) {
    if (!url.includes('?wsdl')) {
        url += '?wsdl';
    }
    return url;
}
exports.validaUrlWsdl = validaUrlWsdl;
//# sourceMappingURL=valida-url-wsdl.js.map