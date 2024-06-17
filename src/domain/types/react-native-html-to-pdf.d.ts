declare module 'react-native-html-to-pdf' {
    export interface Options {
      html: string;
      fileName: string;
      directory?: string;
      base64?: boolean;
      width?: number;
      height?: number;
    }
  
    export interface PDFDocument {
      filePath: string;
      base64: string;
    }
  
    export default class RNHTMLtoPDF {
      static convert(options: Options): Promise<PDFDocument>;
    }
  }
  