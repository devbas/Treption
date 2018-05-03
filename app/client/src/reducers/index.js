import { persistCombineReducers } from 'redux-persist'
import { routerReducer } from 'react-router-redux'
import storage from 'redux-persist/lib/storage'

import * as documents from './documents'
import * as sentences from './sentences'
import * as predicates from './predicates'
import * as extract from './extract'

const config = {
  key: 'primary', 
  storage
}

export default persistCombineReducers(config, Object.assign(documents, sentences, predicates, extract, { routing: routerReducer }));