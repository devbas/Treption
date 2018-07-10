import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import _ from 'lodash'

export const extractingStage = createReducer('subject', {
  [types.SET_EXTRACTING_STAGE](state, action) {
    return action.stage
  }
})

export const extractedTriples = (state = [], action) => {
  let newState = [...state]
  let existingConceptIndex = newState.findIndex(triple => triple.concept === true)
  if(existingConceptIndex === -1) {
    // Create new concept 
    newState.push({ subject: [], predicate: [], object: [], concept: true })
    existingConceptIndex = newState.findIndex(triple => triple.concept === true)
  }

  switch(action.type) {

    case 'SET_TRIPLE_SUBJECT': 
      if(action.subject.isRandomize) {
        newState[existingConceptIndex].subject = [action.subject]
      } else {
        newState[existingConceptIndex].subject.push(action.subject)
      }
      return newState

    case 'SET_TRIPLE_PREDICATE': 
      if(action.predicate.isRandomize) {
        newState[existingConceptIndex].predicate = [action.predicate]
      } else {
        newState[existingConceptIndex].predicate.push(action.predicate)
      }
      return newState
    
    case 'SET_TRIPLE_OBJECT': 
      if(action.object.isRandomize) {
        newState[existingConceptIndex].object = [action.object]
      } else {
        newState[existingConceptIndex].object.push(action.object)
      }
      return newState
    
    case 'SET_SAVED_TRIPLE': 
      newState[existingConceptIndex] = {
        concept: false, 
        object: action.triple.object, 
        predicate: action.triple.predicate,
        subject: action.triple.subject,
        tripleId: action.triple.tripleId, 
        sentenceId: action.triple.sentenceId
      }

      return newState
      // Remove the concept 

    case 'REMOVE_FROM_TRIPLE': 
      const attributeId = action.attribute.identifier
      const conceptTriple = newState[existingConceptIndex]

      if(conceptTriple) {

        newState[existingConceptIndex].subject = _.filter(conceptTriple.subject, function(attribute){
          return attribute.identifier !== attributeId
        })

        newState[existingConceptIndex].predicate = _.filter(conceptTriple.predicate, function(attribute){
          return attribute.identifier !== attributeId
        })

        newState[existingConceptIndex].object = _.filter(conceptTriple.object, function(attribute){
          return attribute.identifier !== attributeId
        })
      }

      return newState
    
    case 'REMOVE_CONCEPT': 
      newState = _.filter(newState, (triple) => {
        return !triple.concept
      })

      return newState
    
    default: 
      return state 
  }

}

export const extractionFeedbackBoxStatus = createReducer(0, {
  [types.EXTRACTION_FEEDBACK_BOX](state, action) {
    return action.status.status
  }
})

export const selectedTripleAttribute = createReducer('subject', {
  [types.SELECTED_TRIPLE_ATTRIBUTE](state, action) {
    return action.attribute
  }
})

export const autoSubjectMovement = createReducer(false, {
  [types.AUTO_SUBJECT_MOVEMENT](state, action) {
    return action.state
  }
})

export const autoObjectMovement = createReducer(false, {
  [types.AUTO_OBJECT_MOVEMENT](state, action) {
    return action.state
  }
})

export const extractionError = createReducer(false, {
  [types.EXTRACTION_ERROR](state, action) {
    return action.message.msg 
  }
})

