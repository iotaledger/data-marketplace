import React from 'react';
import ReactDOM from 'react-dom';
import WebFontLoader from 'webfontloader';
import { Provider } from 'react-redux';
import './assets/scss/index.scss';
import Router from './Router';
import configureStore from './store/configure';
import { initializeFirebaseApp } from './utils/firebase';

WebFontLoader.load({
  google: {
    families: ['Nunito Sans:300,400,600,700', 'Material Icons'],
  },
});

initializeFirebaseApp();
const store = configureStore();

const renderApp = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

ReactDOM.render(renderApp(), document.getElementById('root'));
