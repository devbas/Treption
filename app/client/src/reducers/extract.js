import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const extractingStage = createReducer('subject', {
  [types.SET_EXTRACTING_STAGE](state, action) {
    return action.stage
  }
})

export const extractedTriples = (state = [], action) => {

  let newState = [...state]
  const existingConceptIndex = newState.findIndex(triple => triple.concept === true)
  // debugger;
  switch(action.type) {

    case 'SET_TRIPLE_SUBJECT': 

      /*if(!_.isEmpty(newState)) {
        newState = 
      } else {
        newState = _.assign(newState, { subject: action.subject })
      }

      return newState*/
      
      if(existingConceptIndex > -1) {
        newState[existingConceptIndex] = {...newState[existingConceptIndex], subject: action.subject}
      } else if(newState.length > 0 && !('subject' in newState[newState.length-1])) {
        newState[newState.length-1] = {...newState[newState.length-1], subject: action.subject, concept: true }
      } else {
        //newState.subject = action.subject
        newState.push({
          subject: action.subject
        })
      }
      return newState

    case 'SET_TRIPLE_PREDICATE': 

      if(existingConceptIndex > -1) {
        newState[existingConceptIndex] = {...newState[existingConceptIndex], predicate: action.predicate}
      } else if(newState.length > 0 && !('predicate' in newState[newState.length-1])) {
        newState[newState.length-1] = {...newState[newState.length-1], predicate: action.predicate, concept: true }
      } else {
        newState.push({
          predicate: action.predicate
        })
      }

      return newState
    
    case 'SET_TRIPLE_OBJECT': 

      if(existingConceptIndex > -1) {
        newState[existingConceptIndex] = {...newState[existingConceptIndex], object: action.object}
      } else if(newState.length > 0 && !('object' in newState[newState.length-1])) {
        newState[newState.length-1] = {...newState[newState.length-1], object: action.object, concept: true }
      } else {
        newState.push({
          subject: action.object
        })
      }
      console.log('newState: ', newState)
      return newState
    
    default: 
      return state 
  }

}

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


