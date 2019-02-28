import { createStore, applyMiddleware, compose } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import reducer from './reducer';

let devtools = () => fn => fn;
// let log = () => fn => fn;
if (process.env.NODE_ENV === 'local') {
  if (window.devToolsExtension) {
    devtools = window.devToolsExtension;
  }
}

// if (process.env.NODE_ENV === 'local') {
// log = require('redux-logger').default;
// }

const configureStore = initialState => {
  // const enhancers = [applyMiddleware(reduxPackMiddleware, log), devtools()];
  const enhancers = [applyMiddleware(reduxPackMiddleware), devtools()];

  const store = createStore(reducer, initialState, compose(...enhancers));

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default configureStore;
