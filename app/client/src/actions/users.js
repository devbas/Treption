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

export const boundSetUser = (email, password) => {
  return (dispatch, getState) => {

    let bodyFormData = new FormData() 
    bodyFormData.set('email', email)
    bodyFormData.set('password', password) 

    axios({
      method: 'post', 
      url: '/api/user', 
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then((response) => {
      dispatch(setUser({ email: email, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }))
    })
  }
}

export const boundSetUserAction = (actionKey, value) => {
  return (dispatch, getState) => {
    let bodyFormData = new FormData()
    bodyFormData.set('actionKey', actionKey) 
    bodyFormData.set('value', value) 

    axios({
      method: 'post', 
      url: `/api/user-action`, 
      data: bodyFormData, 
      config: { headers: {'Content-Type': 'multipart/form-data', 'Cookie': `accessToken=${getCookie('accessToken')}` }}
    })
  }
}