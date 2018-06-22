import * as types from './types'
import axios from 'axios'

const fetchDocuments = (documents) => {
  return {
    type: types.SET_DOCUMENTS, 
    documents
  }
}

export const fetchDocument = ( document ) => {
  return {
    type: types.SET_DOCUMENT, 
    document
  }
}

export const fetchLastEditedDocument = (lastEditedDocumentId) => {
  return {
    type: types.SET_LAST_EDITED_DOCUMENT_ID, 
    lastEditedDocumentId
  }
}

const setDocumentLoadingState = (state) => {
  return {
    type: types.DOCUMENT_LOADING_STATE,
    state: state
  }
}

export const uploadText = (text) => {
  return (dispatch, getState) => {

    axios.post(`/api/upload/text`, {
      text: text
    })
  }
}

export const boundFetchDocuments = () => {
  return (dispatch, getState) => {
    dispatch(setDocumentLoadingState(true))
    axios.get(`/api/documents`).then((resp) => {
      dispatch(fetchDocuments({ documents: JSON.parse(resp.data.Documents) }))
      dispatch(fetchLastEditedDocument({ lastEditedDocumentId: JSON.parse(resp.data.LastEditedDocumentId.action_value)}))
      dispatch(setDocumentLoadingState(false))
    }).catch((ex) => {
      console.log('boundFetchDocuments error ', ex)
    })
  }
}

export const boundFetchDocument = (documentId) => {
  return (dispatch, getState) => {
    axios.get(`/api/document/${documentId}`).then((resp) => {
      dispatch(fetchDocument({ document: JSON.parse(resp.data.Document) }))
    }).catch((ex) => {
      console.log('ex: ', ex)
    })
  }
}

export const boundExportTriples = (documentId) => {
  return (dispatch, getState) => {
    axios.get(`/api/export/${documentId}`).then((resp) => {
      //dispatch(exportTriples())
    })
  }
}