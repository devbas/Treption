import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const loggedInUser = createReducer([], {
  [types.SET_USER](state, action) {
    const newState = action
    document.cookie = `accessToken=${action.accessToken}`
    document.cookie = `refreshToken=${action.refreshToken}`
    document.cookie = `identifier=${action.email}`

    if(window.location.pathname !== '/login') {
      window.location.reload();
    } else {
      window.location.replace('/')
    }
    return newState
  }
})

export const fetchedTournament = createReducer([], {
  [types.SET_TOURNAMENT](state, action) {
    console.log('fetchedTOurnament: ', action)
    const newState = action.tournament

    return newState
  }
})

export const createdTournament = createReducer(false, {
  [types.CREATED_TOURNAMENT](state, action) {
    console.log('action: ', action)
    return action.createdTournament
  }
})