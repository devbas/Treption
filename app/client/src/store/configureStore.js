import { compose, createStore, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'; 
import rootReducer from '../reducers/'; 
import createHistory from 'history/createBrowserHistory'
import logger from 'redux-logger'; 
import { routerMiddleware } from 'react-router-redux'
const history = createHistory()

//const historyMiddleware = routerMiddleware(history)

let middleware = [thunk, routerMiddleware(history)]; 

if(process.env.NODE_ENV === 'development') {
  middleware = [...middleware, logger]; 
} else {
  middleware = [...middleware]; 
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware))); 
}