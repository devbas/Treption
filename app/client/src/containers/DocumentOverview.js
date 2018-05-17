import React, { Component } from 'react'
import DocumentComponent from '../components/DocumentOverview'
import * as DocumentActions from '../actions/documents'
import * as UserActions from '../actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DocumentItem from './DocumentItem'
import axios from 'axios'
import { blendColors } from '../utils'
import _ from 'lodash'

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
    this.onHeroExtractClick = this.onHeroExtractClick.bind(this)
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

  onHeroExtractClick() {
    this.props.actions.boundSetUserAction('documentExtractClick', this.props.featuredDocument.documentId)
  }

  onDrop(files) {
    this.setState({
      files,
      dropzoneActive: false
    });

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
  }

  renderDocumentView(document) {
    console.log('document:', document)
    if(document) {
      return (
        <DocumentItem document={document}/>
      )
    }
  }

  render() {

    const baseBackgroundColor = [0,0,0,0.6]
    const documentColorArray = this.props.featuredDocument && this.props.featuredDocument.color ? this.props.featuredDocument.color.split(',') : [0,0,0]
    documentColorArray.push(0.5)

    const backgroundColor = blendColors(baseBackgroundColor, documentColorArray.map(Number))
    const backgroundColorRgba = `rgba(${backgroundColor.join()}`

    let featuredDocumentTitleTrimmed = ''
    if(this.props.featuredDocument && this.props.featuredDocument.value) {
      
      const featuredDocumentTitle = this.props.featuredDocument.value 
      const maxLength = 100

      featuredDocumentTitleTrimmed = featuredDocumentTitle.substr(0, maxLength);
      featuredDocumentTitleTrimmed = featuredDocumentTitleTrimmed.substr(0, Math.min(featuredDocumentTitleTrimmed.length, featuredDocumentTitleTrimmed.lastIndexOf(" ")))
    } 
    
    console.log('render document overview', this.props)
    return(
      <DocumentComponent 
        documents={this.props.documents}
        featuredDocument={this.props.featuredDocument}
        featuredDocumentTitle={featuredDocumentTitleTrimmed}
        featuredDocumentBackground={backgroundColorRgba}
        onDocumentTextChange={this.onDocumentTextChange}
        onDocumentTextSubmit={this.onDocumentTextSubmit}
        documentText={this.state.documentText}
        renderDocumentView={this.renderDocumentView}
        onDrop={this.onDrop}
        dropzoneActive={this.state.dropzoneActive}
        accept={this.state.accept}
        files={this.state.files}
        onHeroExtractClick={this.onHeroExtractClick}
      />
    )
  }
}

function mapStateToProps(state) {
  console.log('map state props: ', state.lastEditedDocumentId, state.fetchedDocuments)
  return {
    featuredDocument: state.lastEditedDocumentId > 0 ? _.find(state.fetchedDocuments, { documentId: state.lastEditedDocumentId }) : state.fetchedDocuments.length > 0 ? state.fetchedDocuments[0] : [],
    documents: state.lastEditedDocumentId > 0 ? _.remove(state.fetchedDocuments, { documentId: state.lastEditedDocumentId }) : state.fetchedDocuments.length > 1 ? state.fetchedDocuments.slice(1) : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, DocumentActions, UserActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentOverview); 