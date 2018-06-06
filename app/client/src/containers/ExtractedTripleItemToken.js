import React, { Component } from 'react'
import _ from 'lodash'

import ExtractedTripleItemTokenComponent from '../components/ExtractedTripleItemToken'

const ItemTypes = {
  WORD: 'word'
};

const squareTarget = {
  drop(props, monitor) {
    console.log('logged!')
    // moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

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