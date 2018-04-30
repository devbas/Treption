import React, { Component } from 'react';
import SentenceOverviewComponent from '../components/SentenceOverview'; 
import * as DocumentActions from '../actions/documents'
import SentenceItem from './SentenceItem'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash';

class SentenceOverview extends Component {

  constructor(props) {
    super(props)

    this.state = {
      documentId: parseInt(this.props.match.params.documentId),
      activeDocument: null
    }

    this.renderSentence = this.renderSentence.bind(this)
  }

  componentDidMount() {
    this.props.actions.boundFetchDocument(this.state.documentId)
  }

  renderSentence(sentence) {
    return (
      <SentenceItem 
        sentence={sentence} 
        documentId={this.props.activeDocument.documentId}
      />
    )
  }

  render() {
    return(
      <SentenceOverviewComponent 
        document={this.props.activeDocument}
        renderSentence={this.renderSentence}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    documents: state.fetchedDocuments, 
    activeDocument: state.fetchedDocument
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, DocumentActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SentenceOverview); 