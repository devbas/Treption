import React, { Component } from 'react'
import _ from 'lodash'
import { DragSource } from 'react-dnd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props) {
      if(this.props.tokens && this.props.tokens.words) {
        const words = this.props.tokens.words
        this.setState({
          words: _.map(words, 'value').join(' ')
        })
      } else {
        this.setState({
          words: this.props.tokens
        })
      }
  
    }
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

function mapStateToProps(state) {
  return {
    extractedTriples: state.extractedTriples
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}), dispatch)
  }
}

ExtractedTripleItemToken = DragSource(ItemTypes.TOKEN, cardSource, collect)(ExtractedTripleItemToken)
ExtractedTripleItemToken = connect(mapStateToProps, mapDispatchToProps)(ExtractedTripleItemToken)

export default ExtractedTripleItemToken