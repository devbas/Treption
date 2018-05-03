import * as types from './types'
import axios from 'axios'

const addPredicate = (predicate) => {
  return {
    type: types.ADD_PREDICATE, 
    predicate
  }
}

const fetchPredicates = (predicates) => {
  return {
    type: types.SET_PREDICATES, 
    predicates
  }
}

export const boundFetchPredicates = () => {
  return (dispatch, getState) => {
    axios.get(`/api/predicates`).then((resp) => {
      dispatch(fetchPredicates({ predicates: JSON.parse(resp.data.Predicates) }))
    })
  }
}

export const boundAddPredicate = (predicate) => {
  return (dispatch, getState) => {
    axios.post(`/api/predicate`, { predicate: predicate }).then((resp) => {
      dispatch(addPredicate({ predicate: JSON.parse(resp.data.Predicate) }))
    })
  }
}