import React, { Component } from 'react';
import ExtractComponent from '../components/Extract'; 
import * as SentenceActions from '../actions/sentences'
import * as PredicateActions from '../actions/predicates'
import * as ExtractActions from '../actions/extract'
import * as UserActions from '../actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { blendColors } from '../utils'
import _ from 'lodash'

import ExtractWordItem from './ExtractWordItem'
import ExtractPredicateItem from './ExtractPredicateItem'
import TripleItem from './TripleItem'

class Extract extends Component {

  constructor(props) {
    super(props)

    this.state = {
      predicateInput: '', 
      totalTriples: !this.props.isSentenceLoading ? this.props.triples.length : 0, 
      currentTripleOffset: 0, 
      //stage: 'subject' // Can either be subject, predicate or object
    }

    this.renderWord = this.renderWord.bind(this)
    this.renderPredicate = this.renderPredicate.bind(this)
    this.onPredicateAdd = this.onPredicateAdd.bind(this)
    this.onPredicateInputChange = this.onPredicateInputChange.bind(this)
    this.isValidating = this.isValidating.bind(this)
    this.isExtracting = this.isExtracting.bind(this)
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentDidMount() {
    const documentId = this.props.match.params.documentId
    const sentenceId = this.props.match.params.sentenceId
    
    this.props.actions.boundFetchTournament()
    this.props.actions.boundFetchSentence(documentId, sentenceId)

    //this.props.actions.boundSetUserAction('sentenceExtractClick', sentenceId)
    //this.props.actions.boundFetchPredicates()
  }

  componentDidUpdate (prevProps) {

    const oldSentenceId = prevProps.match.params.sentenceId
    const sentenceId = this.props.match.params.sentenceId

    if(oldSentenceId !== sentenceId) {
      const documentId = this.props.match.params.documentId
      this.props.actions.boundFetchSentence(documentId, sentenceId)
      this.props.actions.boundSetUserAction('sentenceExtracted', oldSentenceId)
    }
  }

  _handleKeyDown(event) {
  }

  onPredicateAdd() {
    this.props.actions.boundAddPredicate(this.state.predicateInput)
  }

  onPredicateInputChange(event) {
    this.setState({ predicateInput: event.target.value });
  }

  isValidating() {
    
    const unprocessedTriples = _.find(this.props.triples, { processed: false })
    return unprocessedTriples ? true : false 
  }

  isExtracting() {
    const unprocessedTriples = _.find(this.props.triples, { processed: false })
    return unprocessedTriples ? false : true 
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

  render() {
    const baseBackgroundColor = [0,0,0,0.4]
    const documentColorArray = this.props.document.color ? this.props.document.color.split(',') : [0,0,0]
    documentColorArray.push(0.3)

    const backgroundColor = blendColors(baseBackgroundColor, documentColorArray.map(Number))
    const backgroundColorRgba = `rgba(${backgroundColor.join()}`

    let totalTriples = 0
    let currentTripleOffset = 0
    if(!this.props.isSentenceLoading) {
      totalTriples = this.props.triples.length
      currentTripleOffset = _.sumBy(this.props.triples, triple => (triple.processed ? 1 : 0))
    }

    return(
      <ExtractComponent
        sentence={this.props.sentence}
        renderWord={this.renderWord}
        color={backgroundColorRgba}
        documentId={this.props.document.documentId}
        tournament={this.props.tournament}
        tournamentCreated={this.props.tournamentCreated}
        isValidating={this.isValidating}
        isExtracting={this.isExtracting}
        isSentenceLoading={this.props.isSentenceLoading}
        currentTripleOffset={currentTripleOffset}
        totalTriples={totalTriples}
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
    triples: state.fetchedTriples, 
    tournament: state.fetchedTournament,
    tournamentCreated: state.createdTournament, 
    isSentenceLoading: state.isSentenceLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, UserActions, SentenceActions, PredicateActions, ExtractActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Extract); 