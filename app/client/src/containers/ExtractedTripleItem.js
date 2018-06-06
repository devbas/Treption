import React, { Component } from 'react'
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import ExtractedTripleItemComponent from '../components/ExtractedTripleItem'

class ExtractedTripleItem extends Component {

  constructor(props) {
    super(props) 

    this.onTripleAttributeSelect = this.onTripleAttributeSelect.bind(this) 
    this.onTripleSubmit = this.onTripleSubmit.bind(this)

    this.state = {
      subject: [], 
      predicate: [], 
      object: []
    }

  }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps !== this.props) {
      if(this.props.triple) {

        if(Array.isArray(this.props.triple.subject) && this.props.triple.subject.length > 0) {
          this.setState({
            subject: this.props.triple.subject
          })
        }

        if(Array.isArray(this.props.triple.predicate) && this.props.triple.predicate.length > 0) {
          this.setState({
            predicate: this.props.triple.predicate
          })
        }

        if(Array.isArray(this.props.triple.object) && this.props.triple.object.length > 0) {
          this.setState({
            object: this.props.triple.object
          })
        }

        /*if(Array.isArray(this.props.triple.subject) && this.props.triple.subject.length > 0) {
          const words = _.flatten(_.map(this.props.triple.subject, 'words'))
          this.setState({ subject: _.map(words, 'value').join(' ') })
        } else if(!Array.isArray(this.props.triple.subject)) {
          this.setState({ subject: this.props.triple.subject })
        }
  
        if(Array.isArray(this.props.triple.predicate) && this.props.triple.predicate.length > 0) {
          const words = _.flatten(_.map(this.props.triple.predicate, 'words'))
          this.setState({ predicate: _.map(words, 'value').join(' ') })
        } else if(!Array.isArray(this.props.triple.predicate)) {
          this.setState({ predicate: this.props.triple.predicate })
        }
  
        if(Array.isArray(this.props.triple.object) && this.props.triple.object.length > 0) {
          const words = _.flatten(_.map(this.props.triple.object, 'words'))
          this.setState({ object: _.map(words, 'value').join(' ') })
        } else if(!Array.isArray(this.props.triple.object)) {
          this.setState({ object: this.props.triple.object })
        }*/
      }
    }

  }

  onTripleAttributeSelect(attribute) {
    console.log('active: ', attribute)
    this.props.actions.boundTripleAttributeSelected(attribute)
  }

  onTripleSubmit() {
    this.props.actions.boundAddTriple({
      subject: this.state.subject, 
      predicate: this.state.predicate, 
      object: this.state.object, 
      sentenceId: this.props.sentence.sentenceId
    })
  }

  render() {
    const concept = this.props.triple ? this.props.triple.concept : false 

    return (
      <ExtractedTripleItemComponent {...this.props} 
        onTripleAttributeSelect={this.onTripleAttributeSelect}
        onTripleSubmit={this.onTripleSubmit}
        concept={concept}
        subject={this.state.subject}
        predicate={this.state.predicate}
        object={this.state.object}
        renderTripleItemToken={this.renderTripleItemToken}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    sentence: state.fetchedSentence, 
    selectedAttribute: state.selectedTripleAttribute, 
    extractedTriples: state.extractedTriples
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtractedTripleItem) 