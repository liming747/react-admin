import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
// import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const loggerMiddleware = createLogger();
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export default store;
