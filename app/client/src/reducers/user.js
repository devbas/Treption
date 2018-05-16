import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const loggedInUser = createReducer([], {
  [types.SET_USER](state, action) {
    console.log('state: ', state, action)
    document.cookie = `accessToken=${action.accessToken}`

    if(window.location.pathname !== '/login') {
      window.location.reload();
    } else {
      window.location.replace('/')
    }
    return state
  }
})