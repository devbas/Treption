import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const fetchedDocuments = createReducer([], {
  [types.SET_DOCUMENTS](state, action) {
    return action.documents.documents
  }
})

export const fetchedDocument = createReducer([], {
  [types.SET_DOCUMENT](state, action) {
    console.log('state: ', state)
    return action.document.document
  }
})