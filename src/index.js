import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter} from "react-router-dom";

import {Provider} from "react-redux"
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./redux/reducer";
import "antd/dist/antd.css";import { message } from "antd";
import promiseMiddleware from "redux-promise"
message.config({
    duration: 2,
    maxCount: 3,
});

const store = applyMiddleware(promiseMiddleware)(createStore);
ReactDOM.render(
    <Provider store={store(rootReducer)}>
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
