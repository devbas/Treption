import * as types from './types'

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