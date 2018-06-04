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
import moment from 'moment'

import ExtractWordItem from './ExtractWordItem'
import ExtractPredicateItem from './ExtractPredicateItem'
import ValidationItem from './ValidationItem'

class Extract extends Component {

  constructor(props) {
    super(props)

    this.state = {
      predicateInput: '', 
      totalTriples: !this.props.isSentenceLoading ? this.props.triples.length : 0, 
      currentTripleOffset: 0, 
      remainingTime: 0, 
      isExtracting: false , 
      hasStartedValidating: false, 
      hoverBoxStyle: 'hover-layer'
      //stage: 'subject' // Can either be subject, predicate or object
    }

    this.renderWord = this.renderWord.bind(this)
    this.renderPredicate = this.renderPredicate.bind(this)
    this.onPredicateAdd = this.onPredicateAdd.bind(this)
    this.onPredicateInputChange = this.onPredicateInputChange.bind(this)
    this.isValidating = this.isValidating.bind(this)
    this.isExtracting = this.isExtracting.bind(this)
    this.onRandomizeClick = this.onRandomizeClick.bind(this)
    this.timer = this.timer.bind(this)
    this.onValidatingStartClick = this.onValidatingStartClick.bind(this)
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentDidMount() {
    const documentId = this.props.match.params.documentId
    const sentenceId = this.props.match.params.sentenceId
    
    this.props.actions.boundFetchTournament()
    this.props.actions.boundFetchSentence(documentId, sentenceId)

    const currentTime = moment().unix()
    const endTime = moment().add(15, 'seconds').unix()
    const intervalId = setInterval(this.timer, 1000)

    this.setState({
      currentTime: currentTime,
      endTime: endTime, 
      remainingTime: moment.unix(moment(endTime).diff(moment(currentTime))).format('ss'), 
      intervalId: intervalId
    })
    //this.props.actions.boundSetUserAction('sentenceExtractClick', sentenceId)
    //this.props.actions.boundFetchPredicates()
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer() {
    const currentTime = moment().unix() 
    const remainingTime = moment.unix(moment(this.state.endTime).diff(moment(currentTime))).format('ss')

    if(remainingTime > 0) {
      this.setState({
        currentTime: currentTime, 
        remainingTime: remainingTime
      })
    } else {
      console.log('we are done')
      clearInterval(this.state.intervalId);
    }
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

  onValidatingStartClick() {
    this.setState({
      hoverBoxStyle: 'hover-layer animated fadeOut'
    })

    setTimeout(() => {
      this.setState({
        hasStartedValidating: true
      })
    }, 500)
  }

  onRandomizeClick() {
    // We have this.props.sentence 
    console.log('start', this.props.sentence)
    const randomizeBucket = []
    for(let i = 0; i < this.props.sentence.aggregatedWords.length; i++) {
      randomizeBucket[i] = this.props.sentence.aggregatedWords[i].words
    }

    const randomSubjectNumber = Math.floor(Math.random() * randomizeBucket.length)
    this.props.actions.boundUpdateTripleSubject(randomizeBucket[randomSubjectNumber])
    randomizeBucket.splice(randomSubjectNumber, 1)

    const randomPredicateNumber = Math.floor(Math.random() * randomizeBucket.length)
    this.props.actions.boundUpdateTriplePredicate(randomizeBucket[randomPredicateNumber])
    randomizeBucket.splice(randomPredicateNumber, 1)

    const randomObjectNumber = Math.floor(Math.random() * randomizeBucket.length)
    this.props.actions.boundUpdateTripleObject(randomizeBucket[randomObjectNumber])
    randomizeBucket.splice(randomObjectNumber, 1)
    

    console.log('randomizebucket: ', randomizeBucket) 

    // Get all words from sentence

    // Create sentenceWord bucket

    // Select random word from sentence, dispatch as subject, remove from sentenceWord bucket 

    // Select another random word, dispatch as predicate, remove from sentenceWord bucket

    // Select another random word, dispatch as object, remove from sentenceWord bucket
  }

  isValidating() {
    
    const unprocessedTriples = _.find(this.props.triples, { processed: false })

    // this.setState({
    //   isExtracting: unprocessedTriples ? true : false 
    // })

    return unprocessedTriples ? true : false 
  }

  isExtracting() {
    const unprocessedTriples = _.find(this.props.triples, { processed: false })

    // this.setState({
    //   isExtracting: unprocessedTriples ? false : true 
    // })

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
        isExtracting={this.state.isExtracting}
        //stage={this.props.stage}
      />
    )
  }

  render() {
    const baseBackgroundColor = [0,0,0,0.8]
    const documentColorArray = this.props.document.color ? this.props.document.color.split(',') : [0,0,0]
    documentColorArray.push(0.6)

    const backgroundColor = blendColors(baseBackgroundColor, documentColorArray.map(Number))
    const backgroundColorRgba = `rgba(${backgroundColor.join()}`
    
    const backgroundColorLight = backgroundColor
    backgroundColorLight[3] = 0.1 // Change opacity 
    const backgroundColorLightRgba = `rgba(${backgroundColorLight.join()})`

    const backgroundColorMedium = backgroundColor 
    backgroundColorMedium[3] = 0.4
    const backgroundColorMediumRgba = `rgba(${backgroundColorMedium.join()})`

    const playerType = this.props.tournament.challenger_id === this.props.tournament.user_id ? 'challenger' : 'competitor'

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
        backgroundColorLight={backgroundColorLightRgba}
        backgroundColorMedium={backgroundColorMediumRgba}
        documentId={this.props.document.documentId}
        tournament={this.props.tournament}
        tournamentCreated={this.props.tournamentCreated}
        isValidating={this.isValidating}
        isExtracting={this.isExtracting}
        isSentenceLoading={this.props.isSentenceLoading}
        currentTripleOffset={currentTripleOffset}
        totalTriples={totalTriples}
        playerType={playerType}
        onRandomizeClick={this.onRandomizeClick}
        extractedTriples={this.props.extractedTriples}
        remainingTime={this.state.remainingTime}
        onValidatingStartClick={this.onValidatingStartClick}
        hasStartedValidating={this.state.hasStartedValidating}
        hoverBoxStyle={this.state.hoverBoxStyle}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    sentence: state.fetchedSentence, 
    document: state.fetchedDocument,
    predicates: state.predicates, 
    triples: state.fetchedTriples, 
    tournament: state.fetchedTournament,
    tournamentCreated: state.createdTournament, 
    isSentenceLoading: state.isSentenceLoading, 
    extractedTriples: state.extractedTriples
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, UserActions, SentenceActions, PredicateActions, ExtractActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Extract); 