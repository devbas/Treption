import React, { Component } from 'react'
import * as ExtractActions from '../actions/extract'
import * as SentenceActions from '../actions/sentences'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import { DragSource } from 'react-dnd';

import ValidationItemComponent from '../components/ValidationItem'

class ValidationItem extends Component {
  
  constructor(props) {
    super(props) 

    this.state = {
      subject: '', 
      predicate: '', 
      object: '', 
      hasClicked: false, 
      clickedChoice: '', 
      loading: true, 
      processed: false,
      triple: !this.props.isSentenceLoading ? _.find(this.props.triples, { processed: false }) : [], 
      isPointBoxActive: false, 
      isFeedbackBoxActive: false 
    }

    this.onCorrectValidationAnswer = this.props.onCorrectValidationAnswer.bind(this)
    this.onChoiceClick = this.onChoiceClick.bind(this)
  }

  componentDidUpdate() {
    if(this.state.processed) {
      this.setState({
        triple: !this.props.isSentenceLoading ? _.find(this.props.triples, { processed: false }) : [], 
        processed: false, 
        clickedChoice: '', 
        hasClicked: false
      })
    }
  }

  onChoiceClick(choice) {
    if( (this.state.triple.agree + 1 > this.state.triple.disagree && choice === 'agree') || (this.state.triple.disagree + 1 > this.state.triple.agree && choice === 'disagree') ) {

      this.onCorrectValidationAnswer()

      this.setState({
        isPointBoxActive: true, 
        isFeedbackBoxActive: true, 
        hasClicked: true, 
        clickedChoice: choice
      })

      setTimeout(() => {
        this.setState({
          isPointBoxActive: false 
        })
      }, 1200)

      setTimeout(() => {
        this.setState({ 
          isFeedbackBoxActive: false, 
          processed: true 
        })

        this.props.actions.boundSetTripleAsProcessed({...this.state.triple, processed: true })
      }, 1500)
    } else {
      this.setState({
        isPointBoxActive: true,
        isFeedbackBoxActive: true, 
        hasClicked: true, 
        clickedChoice: choice
      })

      setTimeout(() => {
        this.setState({
          isPointBoxActive: false
        })
      }, 1200)

      setTimeout(() => {
        this.setState({ 
          isFeedbackBoxActive: false, 
          processed: true 
        })

        this.props.actions.boundSetTripleAsProcessed({...this.state.triple, processed: true })
      }, 1500)
    }

    this.props.actions.boundTripleVote(this.state.triple.triple_id, choice)
  } 

  render() {

    let answer = ''
    if(!this.props.isSentenceLoading) {
      answer = this.state.triple.agree > this.state.triple.disagree ? 'agree' : 'disagree'
    }

    return (
      <ValidationItemComponent 
        isSentenceLoading={this.props.isSentenceLoading}
        onChoiceClick={this.onChoiceClick}
        hasClicked={this.state.hasClicked}
        answer={answer}
        clickedChoice={this.state.clickedChoice}
        triple={this.state.triple}
        isPointBoxActive={this.state.isPointBoxActive}
        isFeedbackBoxActive={this.state.isFeedbackBoxActive}
      />
    )
    
  }
}

function mapStateToProps(state) {
  return {
    triples: state.fetchedTriples, 
    isSentenceLoading: state.isSentenceLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, ExtractActions, SentenceActions), dispatch)
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ValidationItem); 