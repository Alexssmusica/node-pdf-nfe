import xml2js from "xml2js";

interface BuildOptions {
  rootName: string;
  headless?: boolean;
  renderOpts?: { pretty: boolean };
  cdata?: boolean;
}

function serializeXml(obj: any, rootTag: string): string {
  const builder = new xml2js.Builder({
    rootName: rootTag,
    headless: true, // Assuming headless is always true
    renderOpts: {
      pretty: false, // Assuming pretty formatting is not desired
    },
    cdata: true,
  } as BuildOptions);

  return builder.buildObject(obj);
}

export { serializeXml };
