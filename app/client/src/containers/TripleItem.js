import React, { Component } from 'react'
import * as ExtractActions from '../actions/extract'
import * as SentenceActions from '../actions/sentences'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import TripleItemComponent from '../components/TripleItem'

class TripleItem extends Component {
  
  constructor(props) {
    super(props) 

    this.state = {
      subject: '', 
      predicate: '', 
      object: '', 
      hasClicked: false, 
      clickedChoice: '', 
      triple: [], 
      loading: true, 
      processed: false,
      triple: !this.props.isSentenceLoading ? _.find(this.props.triples, { processed: false }) : []
      //answer: 
    }

    this.onChoiceClick = this.onChoiceClick.bind(this)
    this.onNextQuestionClick = this.onNextQuestionClick.bind(this)
  }

  componentDidMount() {
    
    //this.setState({
      // triple: _.find(this.props.triples, { processed: false })
    // })

    // Fetch first triple that is not processed
    /*if(this.props.triples.length > 0) {
      const triple = _.find(this.props.triples, { processed: false })
      debugger;
      this.setState({
        triple: triple, 
        answer: triple.agree > triple.disagree ? 'agree' : 'disagree'
      }) 
    }*/

    /*const supportedTokens = supportedPosTokens()
    console.log('recall')
    if(this.props.triple.predicate) {
      console.log('predicate found')
      this.setState({
        predicate: this.props.triple.predicate.value
      })
    }

    if(this.props.triple.subject) {
        console.log('subject found')
      const subject = this.props.triple.subject 

      if(subject.combined) {
        if(_.includes(supportedTokens, subject.words[0].pos)) {
          this.setState({
            subject: subject.words[0].value
          })
        } else if(_.includes(supportedTokens, subject.words[1].pos)) {
          this.setState({
            subject: subject.words[1].value
          })
        }
      } else {
        this.setState({
          subject: subject.words[0].value
        })
      }
    }

    if(this.props.triple.object) {
    console.log('object found')
      const object = this.props.triple.object 

      if(object.combined) {
        if(_.includes(supportedPosTokens, object.words[0].pos)) {
          this.setState({
            object: object.words[0].value
          })
        } else if(_.includes(supportedPosTokens, object.words[1].pos)) {
          this.setState({
            object: object.words[1].value 
          })
        }
      } else {
        this.setState({
          object: object.words[0].value
        })
      }
    }*/

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
    //debugger;
  }

  onChoiceClick(choice) {
    this.setState({
      hasClicked: true, 
      clickedChoice: choice
    })
    this.props.actions.boundTripleVote(this.state.triple.triple_id, choice)
  } 

  onNextQuestionClick() {
    this.setState({
      processed: true 
    })
    this.props.actions.boundSetTripleAsProcessed({...this.state.triple, processed: true })
  }

  render() {

    let answer = ''
    if(!this.props.isSentenceLoading) {
      answer = this.state.agree > this.state.disagree ? 'agree' : 'disagree'
    }
    //debugger;
    return (
      <TripleItemComponent 
        //subject={this.state.triple.subject} 
        //predicate={this.state.triple.predicate} 
        //object={this.state.triple.object}
        isSentenceLoading={this.props.isSentenceLoading}
        onChoiceClick={this.onChoiceClick}
        hasClicked={this.state.hasClicked}
        onNextQuestionClick={this.onNextQuestionClick}
        answer={answer}
        clickedChoice={this.state.clickedChoice}
        triple={this.state.triple}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(TripleItem); 