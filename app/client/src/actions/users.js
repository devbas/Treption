import * as types from './types'
import axios from 'axios'

const setUser = (email) => {
  return {
    type: types.SET_USER, 
    email
  }
}

export const boundSetUser = (email, password) => {
  return (dispatch, getState) => {
    axios.post(`/api/user/`, {
      email: email, 
      password: password
    })
    .then((response) => {
      dispatch(setUser({ email: email }))
    })
  }
}