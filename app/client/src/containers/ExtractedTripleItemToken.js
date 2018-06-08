import React, { Component } from 'react'
import _ from 'lodash'
import { DragSource } from 'react-dnd';

import ExtractedTripleItemTokenComponent from '../components/ExtractedTripleItemToken'

const ItemTypes = {
  TOKEN: 'token'
};

const cardSource = {
  beginDrag(props) {
    return {
      scope: props.scope
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class ExtractedTripleItemToken extends Component {

  constructor(props) {
    super(props) 

    if(this.props.tokens && this.props.tokens.words) {
      const words = this.props.tokens.words
      this.state = {
        words: _.map(words, 'value').join(' ')
      }
    } else {
      this.state = {
        words: this.props.tokens
      }
    }

    this.onTokenRemoveClick = this.onTokenRemoveClick.bind(this)
  }

  onTokenRemoveClick(event) {
    event.preventDefault()
  }

  render() {
    return (
      <ExtractedTripleItemTokenComponent 
        tokens={this.state.words} 
        isConcept={this.props.isConcept}
        onTokenRemoveClick={this.onTokenRemoveClick}
        connectDragSource={this.props.connectDragSource}
        isDragging={this.props.isDragging}
      />
    )
  }

}

export default DragSource(ItemTypes.TOKEN, cardSource, collect)(ExtractedTripleItemToken)