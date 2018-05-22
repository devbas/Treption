import * as types from './types'
import axios from 'axios'
import { getCookie } from '../utils'

const setUser = ({ email, accessToken, refreshToken }) => {
  return {
    type: types.SET_USER, 
    email, 
    accessToken, 
    refreshToken
  }
}

const fetchTournament = ({ tournament }) => {
  return {
    type: types.SET_TOURNAMENT, 
    tournament
  }
}

export const boundSetUser = (email, password) => {
  return (dispatch, getState) => {

    // let bodyFormData = new FormData() 
    // bodyFormData.set('email', email)
    // bodyFormData.set('password', password) 

    axios({
      method: 'post', 
      url: '/api/user', 
      data: `email=${email}&password=${password}`,
      config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
    }).then((response) => {
      console.log('response: ', response)
      dispatch(setUser({ email: email, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }))
    })
  }
}

export const boundSetUserAction = (actionKey, value) => {
  return (dispatch, getState) => {

    axios({
      method: 'post', 
      url: `/api/user-action`, 
      data: `actionKey=${actionKey}&value=${value}`, 
      // config: { headers: {'Content-Type': 'multipart/form-data', 'Cookie': `accessToken=${getCookie('accessToken')}` }}
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
  }
}

export const boundFetchTournament = () => {
  return (dispatch, getState) => {
    axios.get(`/api/current-tournament/`).then((response) => {
      dispatch(fetchTournament(response.data.Tournament))
    }).catch((ex) => {
      console.log('ex: ', ex)
    })
  }
}