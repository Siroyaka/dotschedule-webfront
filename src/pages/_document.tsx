import Document, { Html, Head, Main, NextScript } from 'next/document';

import IosMeta from 'components/standalone/IosMeta';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          <meta name="theme-color" content="#FAC141" />
          <IosMeta />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}