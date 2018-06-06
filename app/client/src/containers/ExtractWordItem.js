import React, { Component } from 'react'
import ExtractWordItemComponent from '../components/ExtractWordItem'
import _ from 'lodash'
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd';

const ItemTypes = {
  WORD: 'word'
};

const cardSource = {
  beginDrag(props) {
    return {}
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class ExtractWordItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      inactive: this.props.scope.inactive, 
      wordState: 'send' // either send or receive
    }

    this.onWordClick = this.onWordClick.bind(this)
  }

  componentDidMount() {
    if(!this.state.inactive) {
      
      if(this.props.selectedTripleAttribute === 'subject') {

        const nounWord = _.find(this.props.scope.words, (word) => {
          if(word.pos === 'NN' || word.pos === 'NNS' || word.pos === 'NNP' || word.pos === 'NNPS') {
            return word
          }
        })

        if(nounWord && this.props.selectedTripleAttribute === 'subject') {
          this.setState({
            inactive: false 
          })
        }

      }

    }
  }

  onWordClick() {
    if(!this.state.inactive && this.props.isExtracting && this.props.selectedAttribute) {

      if(this.props.selectedAttribute === 'subject') {
        this.props.actions.boundUpdateTripleSubject(this.props.scope)
      }

      if(this.props.selectedAttribute === 'predicate') {
        this.props.actions.boundUpdateTriplePredicate(this.props.scope)
      }

      if(this.props.selectedAttribute === 'object') {
        this.props.actions.boundUpdateTripleObject(this.props.scope)
      }
    }
  }
  
  render() {
    return(
      <ExtractWordItemComponent
        word={this.props.scope.words.map(w => w.value).join('')}
        inactive={this.state.inactive}
        keystroke={this.props.scope.keystroke}
        onWordClick={this.onWordClick}
        wordState={this.state.wordState}
        isExtracting={this.props.isExtracting}
        connectDragSource={this.props.connectDragSource}
        isDragging={this.props.isDragging}
      />
    ) 
  }

}

function mapStateToProps(state) {
  return {
    stage: state.extractingStage, 
    triples: state.extractedTriples, 
    selectedAttribute: state.selectedTripleAttribute
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}

export default DragSource(ItemTypes.WORD, cardSource, collect)(connect(mapStateToProps, mapDispatchToProps)(ExtractWordItem))