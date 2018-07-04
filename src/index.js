import React from 'react';
import ReactDOM from 'react-dom';
import WebFontLoader from 'webfontloader';
import { BrowserRouter } from 'react-router-dom';
import './assets/scss/index.scss';
import Router from './Router';
import { initializeFirebaseApp } from './utils/firebase';

WebFontLoader.load({
  google: {
    families: ['Nunito Sans:300,400,600,700', 'Material Icons'],
  },
});

initializeFirebaseApp();

const renderApp = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Router />
  </BrowserRouter>
);

ReactDOM.render(renderApp(), document.getElementById('root'));
