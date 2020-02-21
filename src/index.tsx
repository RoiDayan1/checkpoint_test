import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {Provider} from "react-redux";
import {ToastProvider} from "react-toast-notifications";

import {AppStore} from "./state";
import "./index.scss";
import App from "./App";

console.log('%cRoiD %cCheckpoint Test', 'color:#007d7d;font-size:40px', 'color:#004d4d;font-size:20px');
console.log('%cApi URL:', 'color: #0000ff; font-weight: bold;', "[" + process.env.NODE_ENV + "]", process.env.REACT_APP_API_URL);

const rootElement = document.getElementById('app');
ReactDOM.render(
    <Provider store={AppStore}>
      <ToastProvider
          autoDismiss={true}
          autoDismissTimeout={3000}
      >
        <App/>
      </ToastProvider>
    </Provider>,
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
