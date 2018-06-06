import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

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
      newState[existingConceptIndex].subject.push(action.subject)
      return newState

    case 'SET_TRIPLE_PREDICATE': 
      newState[existingConceptIndex].predicate.push(action.predicate)
      return newState
    
    case 'SET_TRIPLE_OBJECT': 
      newState[existingConceptIndex].object.push(action.object)
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
    
    default: 
      return state 
  }

}

export const selectedTripleAttribute = createReducer('subject', {
  [types.SELECTED_TRIPLE_ATTRIBUTE](state, action) {
    return action.attribute
  }
})


// UPDATE_EXTRACTED_TRIPLES



/*export const extractedTriples = createReducer([], {

  [types.SET_TRIPLE_SUBJECT](state, action) {
    const newState = state 

    if(newState.length > 0 && !('subject' in newState[newState.length-1])) {
      newState[newState.length-1].subject = action.subject
    } else {
      newState.push({
        subject: action.subject
      })
    }
    console.log('newState: ', newState)
    return newState
  },


  [types.SET_TRIPLE_PREDICATE](state, action) {
    const newState = state 

    if(newState.length > 0 && !('predicate' in newState[newState.length-1])) {
      newState[newState.length-1].predicate = action.predicate
    } else {
      newState.push({
        predicate: action.predicate
      })
    }

    return newState
  },


  [types.SET_TRIPLE_OBJECT](state, action) {
    const newState = state 

    if(newState.length > 0 && !('object' in newState[newState.length-1])) {
      newState[newState.length-1].object = action.object
    } else {
      newState.push({
        subject: action.object
      })
    }
    console.log('newState: ', newState)
    return newState
  }
}) */


