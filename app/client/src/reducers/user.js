import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const loggedInUser = createReducer([], {
  [types.SET_USER](state, action) {
    const newState = action
    document.cookie = `accessToken=${action.accessToken}; path=/`
    document.cookie = `refreshToken=${action.refreshToken}; path=/`
    document.cookie = `identifier=${action.email}; path=/`

    if(window.location.pathname !== '/login') {
      window.location.reload();
    } else {
      window.location.replace('/')
    }
    return newState
  }
})

export const fetchedPlayer = createReducer([], {
  [types.SET_PLAYER](state, action) {
    const newState = JSON.parse(action.player)
    return newState
  }
})

export const loginError = createReducer(false, {
  [types.SET_LOGIN_ERROR](state, action) {
    return action.error
  }
})
