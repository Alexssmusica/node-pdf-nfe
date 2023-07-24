"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyToUrl = void 0;
function proxyToUrl(pr) {
    const server = `${pr.host}:${pr.port}`;
    let final = pr.isHttps ? 'https://' : 'http://';
    if (pr.auth !== undefined) {
        final = `${final}${pr.auth.username}:${pr.auth.password}@`;
    }
    return `${final}${server}`;
}
exports.proxyToUrl = proxyToUrl;
//# sourceMappingURL=proxy-to-url.js.map