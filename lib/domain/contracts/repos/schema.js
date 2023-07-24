"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SignedInfoTypeCanonicalizationMethod {
    constructor() {
        this.algorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';
    }
}
class ReferenceTypeDigestMethod {
    constructor() {
        this.algorithm = 'http://www.w3.org/2000/09/xmldsig#sha1';
    }
}
var TTransformURI;
(function (TTransformURI) {
    TTransformURI["httpwwww3org200009xmldsigenvelopedsignature"] = "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
    TTransformURI["httpwwww3orgTR2001RECxmlc14n20010315"] = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
})(TTransformURI || (TTransformURI = {}));
class SignedInfoTypeSignatureMethod {
    constructor() {
        this.algorithm = 'http://www.w3.org/2000/09/xmldsig#rsa-sha1';
    }
}
//# sourceMappingURL=schema.js.map