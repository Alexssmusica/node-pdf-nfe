import { type WebProxy } from '../../../domain/contracts/repos';

export function proxyToUrl(pr: WebProxy): string {
    const server = `${pr.host}:${pr.port}`;
    let final = pr.isHttps ? 'https://' : 'http://';

    if (pr.auth !== undefined) {
        final = `${final}${pr.auth.username}:${pr.auth.password}@`;
    }

    return `${final}${server}`;
}
