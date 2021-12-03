import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from '@redux-saga/core';
import reducers from "reducers";
import todoSaga from 'sagas/todoSaga';
import { composeWithDevTools } from 'redux-devtools-extension';
import "bootstrap/dist/css/bootstrap.min.css";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleWare)));

sagaMiddleWare.run(todoSaga); 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
