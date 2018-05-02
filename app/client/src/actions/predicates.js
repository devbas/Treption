import * as types from './types'
import axios from 'axios'

const addPredicate = (predicate) => {
  return {
    type: types.ADD_PREDICATE, 
    predicate
  }
}

export const boundAddPredicate = (predicate) => {
  return (dispatch, getState) => {
    axios.post(`/api/predicate`, { predicate: predicate }).then((resp) => {
      dispatch(addPredicate({ predicate: JSON.parse(resp.data.Predicate) }))
    })
  }
}