import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { persistStore } from 'redux-persist'; 

import configureStore from './store/configureStore'; 
let store = configureStore({});

new Promise((resolve, reject) => {
  persistStore(store, {}, () => {
    resolve();
  }).purge();
}).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root')
  );
})

registerServiceWorker();
