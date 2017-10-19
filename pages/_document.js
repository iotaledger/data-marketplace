import Document, { Head, Main, NextScript } from "next/document"
import { ServerStyleSheet, injectGlobal } from "styled-components"

export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <html>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env
              .GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)};
                gtag('js', new Date());
                gtag('config', '${process.env.GA_TRACKING_ID}');
              `
            }}
          />
          <title>IOTA Data Market</title>
          {styleTags}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <div className="root">{main}</div>
          <NextScript />
        </body>
      </html>
    )
  }
}

injectGlobal`
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    font-family: "Nunito Sans",sans-serif;
    font-weight: 400;
    color: #000;
  }
  button {
    border: none;
    padding: 0;
    outline: none;
    outline-color: initial;
    outline-style: none;
    outline-width: initial;
    cursor: pointer;
  }
  * {
    outline: none;
  }
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  .tablet-hidden-later {
    display: inline;
    @media screen and (max-width: 970px){
      display: none;      
    }
  }
  

  .tablet-hidden {
    display: inline;
    @media screen and (max-width: 1120px){
      display: none;      
    }
  }
  .mobile-hidden {
    display: inline;  
    @media screen and (max-width: 760px){
      display: none;      
    }
  }
  .desktop-hidden {
    display: inline;
    @media screen and (max-width: 970px){
      display: none;      
    }
  }
  .desktop-hidden-later {
    display: inline;    
    @media (min-width: 970px){
      display: none;
      
    }
  }
 
  .mapboxgl-popup-tip {
    color: transparent !important;
    border-bottom-color:transparent !important;
    border-right-color:transparent !important;
    border-left-color:transparent !important;
    border-top-color:transparent !important;
  }
  .mapboxgl-popup-content {
    position: relative;
    background: none !important;
    border-radius: none !important;
    box-shadow: none !important;
    padding: none !important;
    pointer-events: auto;
  @font-face {
    font-family: 'Nunito Sans';
    src: url('/static/fonts/NunitoSans-ExtraLight.ttf');
    font-weight: 200;    
  }
  @font-face {
    font-family: 'Nunito Sans';
    src: url('/static/fonts/NunitoSans-Regular.ttf');
    font-weight: 400;    
  }
  @font-face {
    font-family: 'Nunito Sans';
    src: url('/static/fonts/NunitoSans-Bold.ttf');
    font-weight: 600;    
  }  
  @font-face {
    font-family: 'Nunito Sans';
    src: url('/static/fonts/NunitoSans-ExtraBold.ttf');
    font-weight: 800;    
  }
`
