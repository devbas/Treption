import * as types from './types'
import axios from 'axios'
import { fetchDocument } from './documents'

const fetchSentence = (sentence) => {
  return {
    type: types.SET_SENTENCE, 
    sentence
  }
}

const fetchTriples = (triples) => {
  return {
    type: types.SET_TRIPLES, 
    triples
  }
}

const replaceTriple = (triple) => {
  return {
    type: types.REPLACE_TRIPLE, 
    triple 
  }
}

const setSentenceLoadingState = (state) => {
  return {
    type: types.SENTENCE_LOADING_STATE, 
    state: state
  }
}

export const boundFetchSentence = (documentId, sentenceId) => {
  return (dispatch, getState) => {
    dispatch(setSentenceLoadingState(true))
    axios.get(`/api/sentence/${documentId}/${sentenceId}`).then((resp) => {
      dispatch(fetchSentence({ sentence: JSON.parse(resp.data.Sentence) }))
      dispatch(fetchTriples({ triples: JSON.parse(resp.data.Triples) }))
      dispatch(fetchDocument({ document: JSON.parse(resp.data.Document) }))
      dispatch(setSentenceLoadingState(false))
    })
  }
}

export const boundSetTripleAsProcessed = (processedTriple) => {
  return (dispatch, getState) => {
    dispatch(replaceTriple({ triple: processedTriple }))
  }
}