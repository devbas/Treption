import React, { Component } from 'react'
import DocumentComponent from '../components/DocumentOverview'
import * as DocumentActions from '../actions/documents'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DocumentItem from './DocumentItem'
import axios from 'axios'


class DocumentOverview extends Component {

  constructor(props) {
    super(props)

    this.state = {
      accept: 'text/plain',
      documentText: '', 
      dropzoneActive: true 
    }

    this.onDocumentTextChange = this.onDocumentTextChange.bind(this)
    this.onDocumentTextSubmit = this.onDocumentTextSubmit.bind(this)
    this.renderDocumentView = this.renderDocumentView.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  onDocumentTextChange(event) {
    this.setState({
      documentText: event.target.value
    })
  }

  onDocumentTextSubmit(event) {
    if(this.state.documentText) {
      this.props.actions.uploadText(this.state.documentText)
    }
  }

  onDrop(files) {
    this.setState({
      files,
      dropzoneActive: false
    });

    //let uploadedFile = new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('file', files[0])

      axios.post(`/api/upload/document`, formData, { 
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((resp) => {
        const documentId = JSON.parse(resp.data.DocumentId)
        this.props.history.push(`/document/${documentId.documentId}`)
      }).catch((err) => {
        console.log('oops, something went wrong', err)
      })
    //})
    //this.props.actions.boundUploadDocument(files)
  }

  renderDocumentView(document) {
    if(document) {
      return (
        <DocumentItem document={document}/>
      )
    }
  }

  render() {
    return(
      <DocumentComponent 
        documents={this.props.documents}
        onDocumentTextChange={this.onDocumentTextChange}
        onDocumentTextSubmit={this.onDocumentTextSubmit}
        documentText={this.state.documentText}
        renderDocumentView={this.renderDocumentView}
        onDrop={this.onDrop}
        dropzoneActive={this.state.dropzoneActive}
        accept={this.state.accept}
        files={this.state.files}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    documents: state.fetchedDocuments
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, DocumentActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentOverview); 