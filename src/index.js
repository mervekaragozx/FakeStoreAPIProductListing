import React from "react";
import ReactDOM from "react-dom";
import App from "./components/root/App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import configureStore from "./redux/reducers/configureStore";
import 'alertifyjs/build/css/alertify.min.css';

const store = configureStore();
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
serviceWorker.unregister();
