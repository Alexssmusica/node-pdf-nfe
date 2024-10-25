import type { OptionsV2 } from 'xml2js';
import { Parser } from 'xml2js';

export async function deserializeXml(xml: string, options?: OptionsV2): Promise<any> {
  if (options == null) {
    options = {
      mergeAttrs: true,
      ignoreAttrs: true,
      explicitArray: false
    };
  }
  const parser = new Parser(options);
  return new Promise((resolve, reject) => {
    parser.parseString(xml, (err, result) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
