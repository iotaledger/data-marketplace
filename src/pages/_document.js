import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components';

export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();
    return (
      <html>
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=UA-106570081-3`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)};
                gtag('js', new Date());
                gtag('config', 'UA-106570081-3');
              `,
            }}
          />

          <title>IOTA Data Market</title>
          {styleTags}
          <script src="https://www.google.com/recaptcha/api.js" async defer />
          <meta property="og:title" content="The IOTA Data Marketplace" />
          <meta
            property="og:description"
            content="IOTA makes it possible to securely store, sell, and access data streams."
          />
          <meta
            property="og:image"
            content="https://cdn-images-1.medium.com/max/2000/1*XOSduao7nmUZUpRmjt4zeg.jpeg"
          />
          <meta name="title" content="IOTA Data Marketplace" />
          <meta
            name="description"
            content="IOTA makes it possible to securely store, sell, and access data streams."
          />
          <meta name="keywords" content="IoT, Internet of Things,Marketplace,Data,IOTA" />
          <meta name="author" content="IOTA Foundation" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css" />
        </Head>
        <body>
          <div className="root">{main}</div>
          <NextScript />
        </body>
      </html>
    );
  }
}
