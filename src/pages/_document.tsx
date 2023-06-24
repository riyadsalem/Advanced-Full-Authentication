import Document, { Html, Head, Main, NextScript } from "next/document";
import { DefaultSeo } from "next-seo";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <DefaultSeo
            title="Authentification - Riyad Salem"
            description="Your page description"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
