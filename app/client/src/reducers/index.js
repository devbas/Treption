import { persistCombineReducers } from 'redux-persist'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import storage from 'redux-persist/lib/storage'

const config = {
  key: 'primary', 
  storage
}

export default persistCombineReducers(config, { routing: routerReducer });