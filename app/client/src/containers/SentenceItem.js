import React, { Component } from 'react'
import SentenceItemComponent from '../components/SentenceItem'
import async from 'async'

class SentenceItem extends Component {

  constructor(props) {
    super(props)

    console.log('constructr!')

    /*let sentenceValue = ''
    for(let i = 0; i < this.props.sentence.words.length; i++) {
      const word = this.props.sentence.words[i].value 
      const spaceRegex = /^[0-9a-zA-Z]+$/

      if(i > 0 && word.normalize('NFD').replace(/[\u0300-\u036f]/g, "").charAt(0).match(spaceRegex)) { // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
        sentenceValue = `${sentenceValue} ${word}`
      } else {
        sentenceValue = sentenceValue + word
      }
      console.log('updated sentenvalue: ', sentenceValue)
    }

    this.state = {
      sentenceValue: sentenceValue
    }*/
    this.sentenceConstruct = this.sentenceConstruct.bind(this)
  }

  sentenceConstruct() {
    let sentenceValue = ''
    /*sentenceValue = async.each(this.props.sentence.words, (word, callback) => {
      const spaceRegex = /^[0-9a-zA-Z]+$/

      //if(word.normalize('NFD').replace(/[\u0300-\u036f]/g, "").charAt(0).match(spaceRegex)) { // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
      sentenceValue = `${sentenceValue} ${word.value}`
      console.log('sentenceValue: ', sentenceValue)
      //} else {
        //sentenceValue = sentenceValue + word
      //}

      callback(false, sentenceValue) 
    }, (err, sentenceValue) => {
      console.log('sentenceValue: ', sentenceValue)
      return sentenceValue
    })*/
    /*for(let i = 0; i < this.props.sentence.words.length; i++) {
      const word = this.props.sentence.words[i].value 
      const spaceRegex = /^[0-9a-zA-Z]+$/

      if(i > 0 && word.normalize('NFD').replace(/[\u0300-\u036f]/g, "").charAt(0).match(spaceRegex)) { // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
        sentenceValue = `${sentenceValue} ${word}`
      } else {
        sentenceValue = sentenceValue + word
      }
      console.log('updated sentenvalue: ', sentenceValue)
    }
    
    return sentenceValue*/
  }

  render() {
    //const sentenceValue = this.sentenceConstruct()

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