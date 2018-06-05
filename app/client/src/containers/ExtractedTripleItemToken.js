import React, { Component } from 'react'
import _ from 'lodash'

import ExtractedTripleItemTokenComponent from '../components/ExtractedTripleItemToken'

class ExtractedTripleItemToken extends Component {

  constructor(props) {
    super(props) 

    this.state = {
      words: _.map(this.props.tokens.words, 'value').join(' ')
    }

    this.onTokenRemoveClick = this.onTokenRemoveClick.bind(this)
  }

  onTokenRemoveClick(event) {
    event.preventDefault()
    console.log('remove it')
  }

  render() {
    return (
      <ExtractedTripleItemTokenComponent 
        tokens={this.state.words} 
        isConcept={this.props.isConcept}
        onTokenRemoveClick={this.onTokenRemoveClick}
      />
    )
  }

}

export default ExtractedTripleItemToken