import React, { Component } from 'react'
import { supportedPosTokens } from '../utils'
import _ from 'lodash'
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TripleItemComponent from '../components/TripleItem'

class TripleItem extends Component {
  
  constructor(props) {
    super(props) 

    this.state = {
      subject: '', 
      predicate: '', 
      object: ''
    }

    this.onChoiceClick = this.onChoiceClick.bind(this)
  }

  componentDidMount() {

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

  onChoiceClick(choice) {
    this.props.actions.boundTripleVote(this.props.triple.triple_id, choice)
  } 

  render() {
    console.log('triple: ', this.props)
    return (
      <TripleItemComponent 
        subject={this.props.triple.subject} 
        predicate={this.props.triple.predicate} 
        object={this.props.triple.object}
        onChoiceClick={this.onChoiceClick}/>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TripleItem); 