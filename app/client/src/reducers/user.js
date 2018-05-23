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
    const newState = { createdTournament: action.createdTournament, joinedTournament: action.joinedTournament } 
    return newState
  }
})

export const inviteTournamentStatus = createReducer(false, {
  [types.SET_TOURNAMENT_STATUS](state, action) {
    return action.status
  }
})

export const tournamentJoinStatus = createReducer(false, {
  [types.SET_TOURNAMENT_JOIN_STATUS](state, action) {
    return action.status
  }
})

export const loginError = createReducer(false, {
  [types.SET_LOGIN_ERROR](state, action) {
    return action.error
  }
})
