declare module 'csv-parser' {
  import { Transform } from 'stream';

  interface CsvParserOptions {
    separator?: string;
    headers?: string[] | boolean;
    skipLines?: number;
    strict?: boolean;
    mapHeaders?: (header: string) => string;
    mapValues?: (value: string, header: string) => unknown; 
  }

  function csvParser(options?: CsvParserOptions): Transform;
  export default csvParser;
}
