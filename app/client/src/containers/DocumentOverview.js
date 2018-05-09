import React, { Component } from 'react'
import DocumentComponent from '../components/DocumentOverview'
import * as DocumentActions from '../actions/documents'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DocumentItem from './DocumentItem'


class DocumentOverview extends Component {

  constructor(props) {
    super(props)

    this.state = {
      documentText: ''
    }

    this.onDocumentTextChange = this.onDocumentTextChange.bind(this)
    this.onDocumentTextSubmit = this.onDocumentTextSubmit.bind(this)
    this.renderDocumentView = this.renderDocumentView.bind(this)
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