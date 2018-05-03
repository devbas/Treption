import React, { Component } from 'react';
import ExtractComponent from '../components/Extract'; 
import * as SentenceActions from '../actions/sentences'
import * as PredicateActions from '../actions/predicates'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ExtractWordItem from './ExtractWordItem'

class Extract extends Component {

  constructor(props) {
    super(props)

    this.state = {
      predicateInput: ''
    }

    this.renderWord = this.renderWord.bind(this)
    this.renderPredicate = this.renderPredicate.bind(this)
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
    this.props.actions.boundFetchPredicates()
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
      <p>{predicate[1]}</p>
    )
  }

  renderWord(word) {
    return(
      <ExtractWordItem
        scope={word}
      />
    )
  }

  render() {
    return(
      <ExtractComponent
        sentence={this.props.sentence}
        renderWord={this.renderWord}
        onPredicateAdd={this.onPredicateAdd}
        onPredicateInputChange={this.onPredicateInputChange}
        predicateInput={this.state.predicateInput}
        predicates={this.props.predicates}
        renderPredicate={this.renderPredicate}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    sentence: state.fetchedSentence, 
    predicates: state.predicates
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, SentenceActions, PredicateActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Extract); 