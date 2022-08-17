import React from "react";
import NextDocument from "next/document";
export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    try {
      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
          </React.Fragment>,
        ],
      };
    } finally {
    }
  }
}
