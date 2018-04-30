import React, { Component } from 'react'
import SentenceItemComponent from '../components/SentenceItem'

class SentenceItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sentenceValue: ''
    }
  }

  componentDidMount() {

    let sentenceValue = ''
    for(let i = 0; i < this.props.sentence.words.length; i++) {
      const word = this.props.sentence.words[i].value 
      const spaceRegex = /^[0-9a-zA-Z]+$/

      if(i > 0 && word.normalize('NFD').replace(/[\u0300-\u036f]/g, "").charAt(0).match(spaceRegex)) { // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
        sentenceValue = `${sentenceValue} ${word}`
      } else {
        sentenceValue = sentenceValue + word
      }
    }

    this.setState({
      sentenceValue: sentenceValue
    })
  }

  render() {
    return (
      <SentenceItemComponent 
        sentenceValue={this.state.sentenceValue}
        sentenceId={this.props.sentence.sentenceId}
        documentId={this.props.documentId}
      />
    )
  }
}

export default SentenceItem