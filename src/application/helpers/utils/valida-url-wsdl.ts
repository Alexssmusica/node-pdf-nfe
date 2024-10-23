export function validaUrlWsdl(url: string): string {
    if (!url.includes('?wsdl')) {
        url += '?wsdl';
    }
    return url;
}
