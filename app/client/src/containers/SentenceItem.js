import React, { Component } from 'react'
import SentenceItemComponent from '../components/SentenceItem'

class SentenceItem extends Component {

  render() {
    return (
      <SentenceItemComponent 
        sentenceValue={this.props.sentence.sentenceValue}
        sentenceId={this.props.sentence.sentenceId}
        documentId={this.props.documentId}
        color={this.props.color}
      />
    )
  }
}

export default SentenceItem