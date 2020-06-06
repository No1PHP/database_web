import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.js';
import './statics/iconfont/iconfont';
import store from '../src/pages/login/store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor} from "./pages/login/store";

ReactDOM.render(
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    ,
    document.getElementById('root'));
