import * as types from './types'
import axios from 'axios'

const fetchDocuments = (documents) => {
  console.log('lets set the documents!')
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

export const uploadText = (text) => {
  return (dispatch, getState) => {

    axios.post(`/api/upload/text`, {
      text: text
    })
    .then((response) => {
      console.log('response: ', response)
    })
    .catch((err) => {
      console.log('err: ', err)
    })
  }
}

export const boundFetchDocuments = () => {
  return (dispatch, getState) => {
    axios.get(`/api/documents`).then((resp) => {
      dispatch(fetchDocuments({ documents: JSON.parse(resp.data.Documents) }))
      dispatch(fetchLastEditedDocument({ lastEditedDocumentId: JSON.parse(resp.data.LastEditedDocumentId.action_value)}))
    }).catch((ex) => {
      console.log('ex: ', ex)
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