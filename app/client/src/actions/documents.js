import * as types from './types'
import Api from '../lib/api' 
import axios from 'axios'
import config from '../config'
import fs from 'fs'

const setDocuments = (documents) => {
  console.log('lets set the documents!')
  return {
    type: types.SET_DOCUMENTS, 
    documents
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

/*export const uploadDocuments = (file) => {
  return (dispatch, getState) => {
    
    let data = new FormData()
    data.append('file', file)
    data.append('name', 'blabla')

    axios.post(`/api/upload`, data)
    .then((response) => {

      console.log('Server responded with: ', response)
    
    })
    .catch((err) => {
      console.log('err: ', err)
    })

    /*axios.get(`/api/upload`)
    .then((response) => {
      console.log('Server responded with: ', response)
    })
    .catch((err) => {
      console.log('err: ', err)
    })
  }
} */

export const fetchDocuments = () => {
  return (dispatch, getState) => {
    axios.get(`/api/documents`).then((resp) => {
      dispatch(setDocuments({ documents: JSON.parse(resp.data.Documents) }))
    }).catch((ex) => {
      console.log('ex: ', ex)
    })
  }
}