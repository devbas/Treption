import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const predicates = createReducer([], {
  [types.ADD_PREDICATE](state, action) {
    return action.predicate.predicate
  }
})