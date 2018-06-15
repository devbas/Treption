import * as types from './types'
import axios from 'axios'
import { getCookie } from '../utils'
import * as userActions from './users'

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

const addTriple = (triple) => {
  return {
    type: types.SET_SAVED_TRIPLE, 
    triple
  }
}

const selectedTripleAttribute = (attribute) => {
  return {
    type: types.SELECTED_TRIPLE_ATTRIBUTE, 
    attribute: attribute
  }
}

const removeFromTriple = (attribute) => {
  return {
    type: types.REMOVE_FROM_TRIPLE, 
    attribute: attribute
  }
}

export const setExtractingStage = (stage) => {
  return (dispatch, getState) => {
    dispatch(extractingStage(stage))
  }
}

export const boundUpdateTriplePredicate = (predicate, isRandomize) => {
  return (dispatch, getState) => {
    dispatch(triplePredicate({...predicate, isRandomize: isRandomize }))
  }
}

export const boundUpdateTripleSubject = (subject, isRandomize) => {
  return (dispatch, getState) => {
    dispatch(tripleSubject({...subject, isRandomize: isRandomize }))
  }
}

export const boundUpdateTripleObject = (object, isRandomize) => {
  return (dispatch, getState) => {
    dispatch(tripleObject({...object, isRandomize: isRandomize }))
  } 
}

export const boundRemoveFromTriple = (attribute) => {
  return (dispatch, getState) => {
    dispatch(removeFromTriple(attribute))
  }
}

export const boundTripleVote = (tripleId, choice) => {
  return (dispatch, getState) => {
    axios({
      method: 'post', 
      url: `/api/triple/vote`, 
      data: `tripleId=${tripleId}&choice=${choice}`, 
      config: { headers: {'Content-Type': 'multipart/form-data', 'Cookie': getCookie('accessToken') }}
    }).then((response) => {
      dispatch(userActions.fetchTournament({ tournament: response.data.Tournament }))
    })
  }
}

export const boundTripleAttributeSelected = (attribute) => {
  return (dispatch, getState) => {
    dispatch(selectedTripleAttribute(attribute))
  }
}

export const boundAddTriple = ({ subject, predicate, object, sentenceId }) => {
  return (dispatch, getState) => {
    axios({
      method: 'post', 
      url: `/api/triple/add`, 
      data: `subject=${subject}&predicate=${predicate}&object=${object}&sentenceId=${sentenceId}`, 
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    }).then((response) => {
      dispatch(addTriple(JSON.parse(response.data.Triple)))
      dispatch(userActions.fetchTournament({ tournament: response.data.Tournament }))
    })
  }
}