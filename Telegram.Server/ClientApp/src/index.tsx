import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from 'app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {loadTheme} from "./utils/loadTheme";
import {storedTheme} from "./utils/storedTheme";

const theme = storedTheme();
loadTheme(theme)
  .then(() => {
    document.body.classList.add(theme)
  })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

(module as any).hot.accept();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
