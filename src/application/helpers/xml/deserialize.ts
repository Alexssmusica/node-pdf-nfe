import  xml2js from "xml2js";

interface Options {
  mergeAttrs?: boolean;
  ignoreAttrs?: boolean;
  explicitArray?: boolean;
}

async function deserializeXml(xml: string, options?: xml2js.OptionsV2): Promise<any> {
  const defaultOptions: Options = {
    mergeAttrs: true,
    ignoreAttrs: true,
    explicitArray: false,
  };

  const parser = new xml2js.Parser(options ? { ...defaultOptions, ...options } : defaultOptions);

  return new Promise((resolve, reject) => {
    parser.parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export { deserializeXml };
