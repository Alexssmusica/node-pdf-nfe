"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCartaCorrecaoNfe = exports.validateCancelNfe = exports.validateInutNfe = exports.validateEnvNfe = void 0;
const xsd_schema_validator_1 = require("xsd-schema-validator");
const path_1 = require("path");
async function validateEnvNfe(xml) {
    const response = await new Promise((resolve, reject) => {
        (0, xsd_schema_validator_1.validateXML)(xml, (0, path_1.join)(__dirname, 'enviNFe_v4.00.xsd'), function (err, result) {
            if (result !== undefined) {
                resolve(result);
            }
            else {
                reject(err);
            }
        });
    });
    if (!response.valid) {
        throw new Error(response.messages[0]);
    }
}
exports.validateEnvNfe = validateEnvNfe;
async function validateInutNfe(xml) {
    const response = await new Promise((resolve, reject) => {
        (0, xsd_schema_validator_1.validateXML)(xml, (0, path_1.join)(__dirname, 'inutNFe_v4.00.xsd'), function (err, result) {
            if (result !== undefined) {
                resolve(result);
            }
            else {
                reject(err);
            }
        });
    });
    if (!response.valid) {
        throw new Error(response.messages[0]);
    }
}
exports.validateInutNfe = validateInutNfe;
async function validateCancelNfe(xml) {
    const response = await new Promise((resolve, reject) => {
        (0, xsd_schema_validator_1.validateXML)(xml, (0, path_1.join)(__dirname, 'envEventoCancNFe_v1.00.xsd'), function (err, result) {
            if (result !== undefined) {
                resolve(result);
            }
            else {
                reject(err);
            }
        });
    });
    if (!response.valid) {
        throw new Error(response.messages[0]);
    }
}
exports.validateCancelNfe = validateCancelNfe;
async function validateCartaCorrecaoNfe(xml) {
    const response = await new Promise((resolve, reject) => {
        (0, xsd_schema_validator_1.validateXML)(xml, (0, path_1.join)(__dirname, 'envCCe_v1.00.xsd'), function (err, result) {
            if (result !== undefined) {
                resolve(result);
            }
            else {
                reject(err);
            }
        });
    });
    if (!response.valid) {
        throw new Error(response.messages[0]);
    }
}
exports.validateCartaCorrecaoNfe = validateCartaCorrecaoNfe;
//# sourceMappingURL=validate.js.map