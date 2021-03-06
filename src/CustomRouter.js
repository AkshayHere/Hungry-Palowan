import React, { Component, lazy, Suspense } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { commonProcessors } from 'redux/middlewares';
import { reducer } from 'redux/reducers';
import rootSaga from 'saga/saga';

import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';

const history = createBrowserHistory();

//configure redux store
const configureStore = (initialState) => {

  //init router middleware
  const routeMiddleware = routerMiddleware(history);

  //init saga middleware
  const sagaMiddleware = createSagaMiddleware();

  const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    common: reducer
  });

  const store = createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(logger, routeMiddleware, commonProcessors, sagaMiddleware)
  )

  // store.reducerManager = reducerManager;
  store.sagaMiddleware = sagaMiddleware;
  return store
}

//init the store
const store = configureStore();
store.sagaMiddleware.run(rootSaga);
window.store = store;

const Home = (lazy(() => (
  import(/* webpackChunkName: "Home" */ 'pages/home/App')
)));

const ErrorPage = (lazy(() => (
  import(/* webpackChunkName: "ErrorPage" */ 'pages/common/ErrorPage')
)));

export default function CustomRouter() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/error" component={ErrorPage} />
            <Redirect to={{pathname: "/error"}} />
          </Switch>
        </Suspense>
      </ConnectedRouter>
    </Provider>
  );
}