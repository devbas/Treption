import * as types from './types'; 
import Api from '../lib/api'; 

const setDocuments = (documents) => {
  console.log('lets set the documents!')
}

export const fetchDocuments = () => {
  return (dispatch, getState) => {
    return Api.get(`/api/documents`).then(resp => {
      dispatch(setDocuments({ documents: resp }))
    }).catch((ex) => {
      console.log('ex: ', ex)
    })
  }
}