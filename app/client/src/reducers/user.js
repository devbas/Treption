import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const loggedInUser = createReducer([], {
  [types.SET_USER](state, action) {
    console.log('state: ', state, action)
    document.cookie = `accessToken=${action.accessToken}`
    window.location.reload();
    return state
  }
})