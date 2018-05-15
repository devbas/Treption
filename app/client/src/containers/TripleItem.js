import React, { Component } from 'react'
import { supportedPosTokens } from '../utils'
import _ from 'lodash'

import TripleItemComponent from '../components/TripleItem'

class TripleItem extends Component {
  
  constructor(props) {
    super(props) 

    this.state = {
      subject: '', 
      predicate: '', 
      object: ''
    }
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

  render() {
    return (
      <TripleItemComponent 
        subject={this.props.subject} 
        predicate={this.props.predicate} 
        object={this.props.object}/>
    )
  }
}

export default TripleItem