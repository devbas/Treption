import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import _ from 'lodash'

export const fetchedDocuments = createReducer([], {
  [types.SET_DOCUMENTS](state, action) {
    return action.documents.documents
  }
})

export const fetchedDocument = createReducer([], {
  [types.SET_DOCUMENT](state, action) {

    const newState = action.document.document

    _.forEach(newState.sentences, (sentence) => {
      let sentenceValue = ''
      _.forEach(sentence.words, (word) => {
        const spaceRegex = /^[0-9a-zA-Z]+$/

        if(word.value.replace(/[\u0300-\u036f]/g, "").charAt(0).match(spaceRegex)) { // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
          sentenceValue = `${sentenceValue} ${word.value}`
        } else {
          sentenceValue = sentenceValue + word.value
        }
      })

      sentence.sentenceValue = sentenceValue
    })
    return newState
  }
})

export const lastEditedDocumentId = createReducer(0, {
  [types.SET_LAST_EDITED_DOCUMENT_ID](state, action) {
    const newState = action.lastEditedDocumentId.lastEditedDocumentId
    return newState
  }
})

export const isDocumentLoading = createReducer(false, {
  [types.DOCUMENT_LOADING_STATE](state, action) {
    const newState = action.state; 
    return newState
  }
})