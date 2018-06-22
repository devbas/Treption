import React, { Component } from 'react'
import SentenceItemComponent from '../components/SentenceItem'
import _ from 'lodash'

class SentenceItem extends Component {

  render() {

    let documentTitleTrimmed = ''
    if(this.props.sentence.sentenceValue) {
      
      const maxLength = 50

      documentTitleTrimmed = this.props.sentence.sentenceValue.substr(0, maxLength)
      documentTitleTrimmed = documentTitleTrimmed.substr(0, Math.min(documentTitleTrimmed.length, documentTitleTrimmed.lastIndexOf(" ")))
    } 

    return (
      <SentenceItemComponent 
        sentenceValue={documentTitleTrimmed}
        sentenceId={this.props.sentence.sentenceId}
        documentId={this.props.documentId}
        color={this.props.color}
      />
    )
  }
}

export default SentenceItem