import React from 'react';
import ReactDOM from 'react-dom';
import WebFontLoader from 'webfontloader';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import './assets/scss/index.scss';
import Router from './Router';
import configureStore from './store/configure';
import { initializeFirebaseApp } from './utils/firebase';
import * as serviceWorker from './serviceWorker';

WebFontLoader.load({
  google: {
    families: ['Nunito Sans:300,400,600,700', 'Material Icons'],
  },
});

initializeFirebaseApp();
const store = configureStore();

ReactGA.initialize('UA-133496479-1');
ReactGA.set({ anonymizeIp: true });

const renderApp = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

ReactDOM.render(renderApp(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
