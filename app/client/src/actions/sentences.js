import * as types from './types'
import axios from 'axios'

const fetchSentence = (sentence) => {
  return {
    type: types.SET_SENTENCE, 
    sentence
  }
}

export const boundFetchSentence = (documentId, sentenceId) => {
  return (dispatch, getState) => {
    axios.get(`/api/sentence/${documentId}/${sentenceId}`).then((resp) => {
      dispatch(fetchSentence({ sentence: JSON.parse(resp.data.Sentence) }))
    })
  }
}