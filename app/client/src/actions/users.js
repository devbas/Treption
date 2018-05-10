import * as types from './types'
import axios from 'axios'

const setUser = ({ email, accessToken}) => {
  return {
    type: types.SET_USER, 
    email, 
    accessToken
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
      dispatch(setUser({ email: email, accessToken: response.data.accessToken }))
    })
  }
}