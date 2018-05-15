import * as types from './types'
import axios from 'axios'
import { getCookie } from '../utils'

const extractingStage = (stage) => {
  return {
    type: types.SET_EXTRACTING_STAGE, 
    stage
  }
}

const triplePredicate = (predicate) => {
  return {
    type: types.SET_TRIPLE_PREDICATE, 
    predicate
  }
}

const tripleSubject = (subject) => {
  return {
    type: types.SET_TRIPLE_SUBJECT, 
    subject
  }
}

const tripleObject = (object) => {
  return {
    type: types.SET_TRIPLE_OBJECT, 
    object 
  }
}

export const setExtractingStage = (stage) => {
  return (dispatch, getState) => {
    dispatch(extractingStage(stage))
  }
}

export const setTriplePredicate = (predicate) => {
  return (dispatch, getState) => {
    dispatch(triplePredicate(predicate))
  }
}

export const setTripleSubject = (subject) => {
  return (dispatch, getState) => {
    dispatch(tripleSubject(subject))
  }
}

export const setTripleObject = (object) => {
  return (dispatch, getState) => {
    dispatch(tripleObject(object))
  } 
}

export const boundTripleVote = (tripleId, choice) => {
  return (dispatch, getState) => {
    let bodyFormData = new FormData()
    bodyFormData.set('tripleId', tripleId) 
    bodyFormData.set('choice', choice) 

    axios({
      method: 'post', 
      url: `/api/triple/vote`, 
      data: bodyFormData, 
      config: { headers: {'Content-Type': 'multipart/form-data', 'Cookie': getCookie('accessToken') }}
    })
  }
}