import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const newPredicate = createReducer([], {
  [types.ADD_PREDICATE](state, action) {
    return action.predicate.predicate
  }
})

export const predicates = createReducer([], {
  [types.SET_PREDICATES](state, action) {
    return action.predicates.predicates
  }
})

//export const predicates = 