import React, { Component } from 'react'
import ExtractWordItemComponent from '../components/ExtractWordItem'
import _ from 'lodash'
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd';
import { supportedPosTokens } from '../utils'

const ItemTypes = {
  WORD: 'word'
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

class ExtractWordItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // inactive: this.props.scope.inactive, 
      active: false,
      isSelected: false, 
      wordState: 'send' // either send or receive
    }

    this.onWordClick = this.onWordClick.bind(this)
  }

  componentDidMount() {
    this.setWordActive()
    this.isWordSelected()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props) {
      this.setWordActive()
      this.isWordSelected()
    }
  }

  setWordActive() {
    if(this.props.selectedAttribute === 'subject' || this.props.selectedAttribute === 'object') {
      const nounWord = _.find(this.props.scope.words, (word) => {
        if((word.pos === 'NN' || word.pos === 'NNS' || word.pos === 'NNP' || word.pos === 'NNPS')) {
          return word
        }
      })

      if(nounWord && this.props.scope.supportedTag) {
        this.setState({
          active: true 
        })
      } else {
        this.setState({
          active: false 
        })
      }

    }

    if(this.props.selectedAttribute === 'predicate') {
      const nounWord = _.find(this.props.scope.words, (word) => {
        if(word.pos !== 'NN' && word.pos !== 'NNS' && word.pos !== 'NNP' && word.pos !== 'NNPS' && supportedPosTokens().includes(word.pos)) {
          return word
        } 
      })

      if(nounWord && this.props.scope.supportedTag) {
        this.setState({
          active: true 
        })
      } else {
        this.setState({
          active: false 
        })
      }
    }
  }

  isWordSelected() {
    const wordId = _.get(this.props.scope, 'words.0.id')
    const tripleConcept = _.find(this.props.triples, { 'concept': true })

    if(tripleConcept) {
      let words = _.flatten(_.map(tripleConcept.subject, 'words'))
      words = _.unionBy(_.flatten(_.map(tripleConcept.predicate, 'words')), words, 'id')
      words = _.unionBy(_.flatten(_.map(tripleConcept.object, 'words')), words, 'id')

      this.setState({
        isSelected: _.find(words, { 'id': wordId }) ? true : false 
      })
    } else {
      this.setState({
        isSelected: false
      })
    }
  }

  onWordClick() {
    if(!this.state.inactive && this.props.isExtracting && this.props.selectedAttribute && !this.state.isSelected) {

      if(this.props.selectedAttribute === 'subject') {
        this.props.actions.boundUpdateTripleSubject(this.props.scope)

        // if(!this.props.autoSubjectMovement) {
        //   this.props.actions.boundTripleAttributeSelected('object')
        //   this.props.actions.boundsetAutoSubjectMovement(true)
        // }
      }

      if(this.props.selectedAttribute === 'predicate') {
        this.props.actions.boundUpdateTriplePredicate(this.props.scope)
      }

      if(this.props.selectedAttribute === 'object') {
        this.props.actions.boundUpdateTripleObject(this.props.scope)

        // if(!this.props.autoObjectMovement) {
        //   this.props.actions.boundTripleAttributeSelected('predicate')
        //   this.props.actions.boundsetAutoObjectMovement(true)
        // }
      }
    }

    if(this.state.isSelected) {
      this.props.actions.boundRemoveFromTriple(this.props.scope)
    }
  }
  
  render() {

    return(
      <ExtractWordItemComponent
        word={this.props.scope.words.map(w => w.value).join('')}
        active={this.state.active}
        keystroke={this.props.scope.keystroke}
        onWordClick={this.onWordClick}
        wordState={this.state.wordState}
        supportedTag={this.props.scope.supportedTag}
        isExtracting={this.props.isExtracting}
        connectDragSource={this.props.connectDragSource}
        isDragging={this.props.isDragging}
        isSelected={this.state.isSelected}
      />
    ) 
  }
}

function mapStateToProps(state) {
  return {
    stage: state.extractingStage, 
    triples: state.extractedTriples, 
    selectedAttribute: state.selectedTripleAttribute, 
    autoSubjectMovement: state.autoSubjectMovement, 
    autoObjectMovement: state.autoObjectMovement
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}

export default DragSource(ItemTypes.WORD, cardSource, collect)(connect(mapStateToProps, mapDispatchToProps)(ExtractWordItem))