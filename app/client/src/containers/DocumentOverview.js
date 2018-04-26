import React, { Component } from 'react'
import DocumentComponent from '../components/DocumentOverview'
import * as DocumentActions from '../actions/documents'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class DocumentOverview extends Component {

  constructor(props) {
    super(props)

    this.state = {
      documentText: ''
    }

    //this.onFileDrop = this.onFileDrop.bind(this)
    this.onDocumentTextChange = this.onDocumentTextChange.bind(this)
    this.onDocumentTextSubmit = this.onDocumentTextSubmit.bind(this)
  }

  /*onFileDrop(files) {
    console.log('file dropped!')
    /*this.setState({
      files: files
    })

    this.props.actions.uploadDocuments(files)
  }*/

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

  render() {
    return(
      <DocumentComponent 
        documents={this.props.documents}
        onDocumentTextChange={this.onDocumentTextChange}
        onDocumentTextSubmit={this.onDocumentTextSubmit}
        documentText={this.state.documentText}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
	actions: bindActionCreators(Object.assign({}, DocumentActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentOverview); 