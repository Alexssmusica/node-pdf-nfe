import * as xml2js from 'xml2js';

export function serializeXml(obj: any, rootTag: string): string {
    const builder = new xml2js.Builder({
        rootName: rootTag,
        headless: true,
        renderOpts: {
            pretty: false, // Não formata o XML
        },
        cdata: true, // Utiliza CDATA para valores
    });

    return builder.buildObject(obj);
}
