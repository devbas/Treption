import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const loggedInUser = createReducer([], {
  [types.SET_USER](state, action) {
    document.cookie = `accessToken=${action.accessToken}`
    document.cookie = `refreshToken=${action.refreshToken}`

    if(window.location.pathname !== '/login') {
      window.location.reload();
    } else {
      window.location.replace('/')
    }
    return state
  }
})