import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ExtractedTripleItemToken from './ExtractedTripleItemToken'

const ItemTypes = {
  WORD: 'word'
};

const squareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    console.log('logged!', props, item)
    if(props.attribute === 'subject') {
      props.actions.boundUpdateTripleSubject(item.scope)
    }

    if(props.attribute === 'predicate') {
      props.actions.boundUpdateTriplePredicate(item.scope) 
    }

    if(props.attribute === 'object') {
      props.actions.boundUpdateTripleObject(item.scope)
    }

    // moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}


class ExtractedTripleElement extends Component {

  constructor(props) {
    super(props) 

    this.renderTripleItemToken = this.renderTripleItemToken.bind(this)
  }

  componentDidMount() {
    console.log('ExtractedTripleElement was mounted')
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('ExtractedTripleElement did update')
  }

  applyExtractionGuidelines() {
    //if(this.props.selectedAttribute === 'subject' && )
  }

  renderTripleItemToken(tokens, attribute, concept) {
    return (
      <ExtractedTripleItemToken tokens={tokens} attribute={attribute} isConcept={concept}/>
    )
  }

  render() {
    if(this.props.concept) {
      return this.props.connectDropTarget(
        <div style={{width: '100%', height: '100%'}} className="token-outer-box">
          {this.props.data.map((tokens) => this.renderTripleItemToken(tokens, this.props.attribute, this.props.concept))}
          {this.props.isOver &&
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: 'white',
            }} />
          }
        </div>
      )
    } else {
      return (
        <div style={{width: '100%', height: '100%'}}>
          {this.renderTripleItemToken(this.props.data, this.props.attribute, this.props.concept)}
        </div>
      )
    }
  }

}

function mapStateToProps(state) {
  return {
    extractedTriples: state.extractedTriples, 
    selectedAttribute: state.selectedTripleAttribute
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}

ExtractedTripleElement = DropTarget(ItemTypes.WORD, squareTarget, collect)(ExtractedTripleElement)
ExtractedTripleElement = connect(mapStateToProps, mapDispatchToProps)(ExtractedTripleElement)

export default ExtractedTripleElement
// export default DropTarget(ItemTypes.WORD, squareTarget, collect)(connect(mapStateToProps, mapDispatchToProps)(ExtractedTripleElement))

