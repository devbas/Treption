import React, { Component } from 'react';
import ExtractComponent from '../components/Extract'; 
import * as SentenceActions from '../actions/sentences'
import * as PredicateActions from '../actions/predicates'
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { blendColors } from '../utils'

import ExtractWordItem from './ExtractWordItem'
import ExtractPredicateItem from './ExtractPredicateItem'
import TripleItemComponent from './TripleItem'

class Extract extends Component {

  constructor(props) {
    super(props)

    this.state = {
      predicateInput: ''
      //stage: 'subject' // Can either be subject, predicate or object
    }

    this.renderWord = this.renderWord.bind(this)
    this.renderPredicate = this.renderPredicate.bind(this)
    this.renderTriple = this.renderTriple.bind(this)
    this.onPredicateAdd = this.onPredicateAdd.bind(this)
    this.onPredicateInputChange = this.onPredicateInputChange.bind(this)
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentDidMount() {
    const documentId = this.props.match.params.documentId
    const sentenceId = this.props.match.params.sentenceId

    this.props.actions.boundFetchSentence(documentId, sentenceId)
    //this.props.actions.boundFetchPredicates()
  }

  _handleKeyDown(event) {
    console.log('key pressed!', event.key)
  }

  onPredicateAdd() {
    this.props.actions.boundAddPredicate(this.state.predicateInput)
  }

  onPredicateInputChange(event) {
    this.setState({ predicateInput: event.target.value });
  }

  renderPredicate(predicate) {
    return (
      <ExtractPredicateItem 
        value={predicate[1]}
        id={predicate[0]}
      />
    )
  }

  renderWord(word) {
    return(
      <ExtractWordItem
        scope={word}
        stage={this.props.stage}
      />
    )
  }

  renderTriple(triple) {
    return (
      <TripleItemComponent
        subject={triple.subject}
        predicate={triple.predicate}
        object={triple.object}
      />
    )
  }

  render() {

    const baseBackgroundColor = [0,0,0,0.4]
    const documentColorArray = this.props.document.color ? this.props.document.color.split(',') : [0,0,0]
    documentColorArray.push(0.3)

    const backgroundColor = blendColors(baseBackgroundColor, documentColorArray.map(Number))
    const backgroundColorRgba = `rgba(${backgroundColor.join()}`

    return(
      <ExtractComponent
        sentence={this.props.sentence}
        renderWord={this.renderWord}
        onPredicateAdd={this.onPredicateAdd}
        onPredicateInputChange={this.onPredicateInputChange}
        predicateInput={this.state.predicateInput}
        predicates={this.props.predicates}
        renderPredicate={this.renderPredicate}
        triples={this.props.triples}
        renderTriple={this.renderTriple}
        color={backgroundColorRgba}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    sentence: state.fetchedSentence, 
    document: state.fetchedDocument,
    predicates: state.predicates, 
    stage: state.extractingStage, 
    triples: state.fetchedTriples
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, SentenceActions, PredicateActions, ExtractActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Extract); 