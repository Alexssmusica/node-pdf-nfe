"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeXml = void 0;
const xml2js_1 = require("xml2js");
async function deserializeXml(xml, options) {
    if (options == null) {
        options = {
            mergeAttrs: true,
            ignoreAttrs: true,
            explicitArray: false
        };
    }
    const parser = new xml2js_1.Parser(options);
    return new Promise((resolve, reject) => {
        parser.parseString(xml, (err, result) => {
            if (err != null) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.deserializeXml = deserializeXml;
//# sourceMappingURL=deserialize.js.map