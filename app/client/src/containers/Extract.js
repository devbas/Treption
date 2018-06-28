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
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import ExtractWordItem from './ExtractWordItem'
import ExtractPredicateItem from './ExtractPredicateItem'

class Extract extends Component {

  constructor(props) {
    super(props)

    this.timer = this.timer.bind(this)
    const intervalId = setInterval(this.timer, 1000)

    this.state = {
      predicateInput: '', 
      totalTriples: !this.props.isSentenceLoading ? this.props.triples.length : 0, 
      remainingTime: '00:15', 
      isExtracting: false , 
      hasStartedValidating: false, 
      hoverBoxStyle: 'hover-layer', 
      hasStartedExtracting: false, 
      gameOver: false, 
      isFeedbackBoxActive: false, 
      isPointBoxActive: false, 
      intervalId: intervalId
    }

    this.renderWord = this.renderWord.bind(this)
    this.renderPredicate = this.renderPredicate.bind(this)
    this.onPredicateAdd = this.onPredicateAdd.bind(this)
    this.onPredicateInputChange = this.onPredicateInputChange.bind(this)
    this.isValidating = this.isValidating.bind(this)
    this.isExtracting = this.isExtracting.bind(this)
    
    this.onExtractingStartClick = this.onExtractingStartClick.bind(this)
    this.onCorrectValidationAnswer = this.onCorrectValidationAnswer.bind(this)
    this.onNewGameStartClick = this.onNewGameStartClick.bind(this)
  }

  componentDidMount() {
    const documentId = this.props.match.params.documentId
    const sentenceId = this.props.match.params.sentenceId
  
    this.props.actions.boundFetchSentence(documentId, sentenceId)

    //this.props.actions.boundSetUserAction('sentenceExtractClick', sentenceId)
    //this.props.actions.boundFetchPredicates()

    const currentTime = moment().unix()
    const endTime = moment().add(15, 'seconds').unix()
    const intervalId = setInterval(this.timer, 1000)
    const remainingTime = moment.unix(moment(endTime).diff(moment(currentTime))).format('mm:ss')
    console.log('intervalid: ', intervalId)
    this.setState({
      // hoverBoxStyle: 'hover-layer animated fadeOut',
      currentTime: currentTime,
      endTime: endTime, 
      remainingTime: remainingTime, 
      intervalId: intervalId
    })
  }

  componentWillUnmount() {
    console.log('component unmount')
    clearInterval(this.state.intervalId);
  }

  timer() {
    console.log('update time!')
    const currentTime = moment().unix() 
    const remainingTime = moment.unix(moment(this.state.endTime).diff(moment(currentTime))).format('mm:ss')
    // const isValidating = this.isValidating()

    if(this.isValidating()) {
      if(remainingTime !== '00:00') {
        this.setState({
          currentTime: currentTime, 
          remainingTime: remainingTime
        })
      } else {
        clearInterval(this.state.intervalId);
        this.setState({
          gameOver: true, 
          remainingTime: '00:00'
        })
      }
    } else if(this.state.intervalId) {
      clearInterval(this.state.intervalId) 
      this.setState({
        intervalId: false, 
        remainingTime: '00:00'
      })
    }
  }

  componentDidUpdate (prevProps) {

    const oldSentenceId = prevProps.match.params.sentenceId
    const sentenceId = this.props.match.params.sentenceId

    if(oldSentenceId !== sentenceId) {
      const documentId = this.props.match.params.documentId
      this.props.actions.boundFetchSentence(documentId, sentenceId)
      this.props.actions.boundRemoveTripleConcept() 
      this.props.actions.boundSetUserAction('sentenceExtracted', oldSentenceId)
    }

    if(prevProps.extractionFeedbackBoxStatus === 0 && this.props.extractionFeedbackBoxStatus !== 0) {
      // Set interval to close feedbackBox
      this.setState({
        isFeedbackBoxActive: true, 
        isPointBoxActive: true 
      })

      setTimeout(() => {
        this.setState({
          isPointBoxActive: false 
        })
      }, 1200)

      setTimeout(() => {
        this.setState({ 
          isFeedbackBoxActive: false, 
        })

        this.props.actions.boundSetExtractionFeedbackBox(0)
      }, 1500)
    }
  }

  onPredicateAdd() {
    this.props.actions.boundAddPredicate(this.state.predicateInput)
  }

  onPredicateInputChange(event) {
    this.setState({ predicateInput: event.target.value });
  }

  onExtractingStartClick() {
    this.setState({
      hoverBoxStyle: 'hover-layer animated fadeOut'
    })

    setTimeout(() => {
      this.setState({
        hasStartedExtracting: true, 
        hoverBoxStyle: 'hover-layer'
      })
    }, 500)
  }

  onCorrectValidationAnswer() {
    const endTime = moment.unix(this.state.endTime).add(15, 'seconds').unix()
    
    this.setState((prevState, props) => {
      return {
        endTime: endTime
      }
    })

    clearInterval(this.state.intervalId)
    const intervalId = setInterval(this.timer, 1000)

    this.setState({
      intervalId: intervalId
    })
  }

  onNewGameStartClick() {
    // Redirect to next sentence
    if(this.props.sentence.nextSentence) {
      const documentId = this.props.match.params.documentId
      window.location.replace(`/extract/${documentId}/${this.props.sentence.nextSentence}`)
    } else {
      window.location.replace('/')
    }
  }

  isValidating() {
    const unprocessedTriples = _.find(this.props.triples, { processed: false })
    return unprocessedTriples ? true : false 
    // return false 
  }

  isExtracting() {
    const unprocessedTriples = _.find(this.props.triples, { processed: false })

    // Clear time interval once we shift from validation to extraction
    if(this.state.intervalId) {
      this.setState({
        intervalId: 0
      })
      clearInterval(this.state.intervalId);
    }

    return unprocessedTriples ? false : true 
    // return true 
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
    const isExtracting = this.isExtracting()

    return(
      <ExtractWordItem
        scope={word}
        isExtracting={isExtracting}
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

    const extractionContainsConcept = _.find(this.props.extractedTriples, { concept: true })

    return(
      <ExtractComponent
        sentence={this.props.sentence}
        renderWord={this.renderWord}
        color={backgroundColorRgba}
        backgroundColorLight={backgroundColorLightRgba}
        backgroundColorMedium={backgroundColorMediumRgba}
        documentId={this.props.document.documentId}
        isValidating={this.isValidating}
        isExtracting={this.isExtracting}
        isSentenceLoading={this.props.isSentenceLoading}
        extractedTriples={this.props.extractedTriples.reverse()}
        remainingTime={this.state.remainingTime}
        hoverBoxStyle={this.state.hoverBoxStyle}
        hasStartedExtracting={this.state.hasStartedExtracting}
        onExtractingStartClick={this.onExtractingStartClick}
        extractionContainsConcept={extractionContainsConcept ? true : false}
        onCorrectValidationAnswer={this.onCorrectValidationAnswer}
        gameOver={this.state.gameOver}
        onNewGameStartClick={this.onNewGameStartClick}
        selectedAttribute={this.props.selectedAttribute}
        player={this.props.player}
        extractionFeedbackBoxStatus={this.props.extractionFeedbackBoxStatus}
        isPointBoxActive={this.state.isPointBoxActive}
        isFeedbackBoxActive={this.state.isFeedbackBoxActive}
      />
    )
  }
}

function mapStateToProps(state) {

  let extractedTriples = _.filter(state.extractedTriples, (triple) => { 
    return Number(triple.sentenceId) === Number(state.fetchedSentence.sentenceId) || triple.concept === true
    // return Number(triple.sentenceId) === Number(state.fetchedSentence.sentenceId)
  })
  extractedTriples = extractedTriples ? extractedTriples : []

  return {
    sentence: state.fetchedSentence, 
    document: state.fetchedDocument,
    predicates: state.predicates, 
    triples: state.fetchedTriples, 
    isSentenceLoading: state.isSentenceLoading, 
    extractedTriples: extractedTriples,
    selectedAttribute: state.selectedTripleAttribute, 
    player: state.fetchedPlayer, 
    extractionFeedbackBoxStatus: state.extractionFeedbackBoxStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, UserActions, SentenceActions, PredicateActions, ExtractActions), dispatch)
  }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(Extract)); 