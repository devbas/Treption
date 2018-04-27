import { persistCombineReducers } from 'redux-persist'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import storage from 'redux-persist/lib/storage'

import * as documents from './documents'

const config = {
  key: 'primary', 
  storage
}

export default persistCombineReducers(config, Object.assign(documents, { routing: routerReducer }));