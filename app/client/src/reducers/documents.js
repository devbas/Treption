import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const fetchedDocuments = createReducer([], {
  [types.SET_DOCUMENTS](state, action) {
    return action.documents.documents
  }
})