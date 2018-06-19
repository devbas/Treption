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

export const fetchPlayer = ({ player }) => {
  return {
    type: types.SET_PLAYER, 
    player
  }
}

const setLoginError = ({ error }) => {
  return {
    type: types.SET_LOGIN_ERROR, 
    error
  }
}

export const boundSetUser = (email, password) => {
  return (dispatch, getState) => {

    axios({
      method: 'post', 
      url: '/api/user', 
      data: `email=${email}&password=${password}`,
      config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
    }).then((response) => {
      console.log('response: ', response)
      dispatch(setUser({ email: email, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }))
    }).catch((error) => {
      dispatch(setLoginError({ error: error }))
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

export const boundFetchPlayer = () => {
  return (dispatch, getState) => {
    axios.get(`/api/player`).then((response) => {
      dispatch(fetchPlayer({ player: response.data.Player }))
    }).catch((ex) => {
      console.log('ex: ', ex)
    })
  }
}