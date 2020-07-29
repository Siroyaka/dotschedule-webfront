import Document, { Head, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from 'modules/gtag';
import IosMeta from 'component/standalone/IosMeta';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang='ja'>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <meta name="theme-color" content="#FAC141" />
          <IosMeta />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}