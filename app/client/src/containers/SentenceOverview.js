import React, { Component } from 'react';
import SentenceOverviewComponent from '../components/SentenceOverview'; 
import * as DocumentActions from '../actions/documents'
import SentenceItem from './SentenceItem'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { blendColors } from '../utils'

class SentenceOverview extends Component {

  constructor(props) {
    super(props)

    this.state = {
      documentId: parseInt(this.props.match.params.documentId),
      activeDocument: null
    }

    this.renderSentence = this.renderSentence.bind(this)
    this.onExportClick = this.onExportClick.bind(this)
  }

  componentDidMount() {
    this.props.actions.boundFetchDocument(this.state.documentId)
  }

  onExportClick() {
    this.props.actions.boundExportTriples(this.state.documentId)
  }

  renderSentence(sentence, backgroundColor) {
    return (
      <SentenceItem 
        key={sentence.sentenceId}
        sentence={sentence} 
        documentId={this.props.activeDocument.documentId}
        color={backgroundColor}
      />
    )
  }

  render() {

    const baseBackgroundColor = [0,0,0,0.6]
    const documentColorArray = this.props.activeDocument.color ? this.props.activeDocument.color.split(',') : [0,0,0]
    documentColorArray.push(0.5)

    const backgroundColor = blendColors(baseBackgroundColor, documentColorArray.map(Number))
    const backgroundColorRgba = `rgba(${backgroundColor.join()}`

    return(
      <SentenceOverviewComponent 
        document={this.props.activeDocument}
        renderSentence={this.renderSentence}
        backgroundColor={backgroundColorRgba}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    activeDocument: state.fetchedDocument
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, DocumentActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SentenceOverview); 