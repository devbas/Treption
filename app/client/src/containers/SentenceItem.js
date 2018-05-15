import React, { Component } from 'react'
import SentenceItemComponent from '../components/SentenceItem'
import async from 'async'

class SentenceItem extends Component {

  constructor(props) {
    super(props)
  }

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