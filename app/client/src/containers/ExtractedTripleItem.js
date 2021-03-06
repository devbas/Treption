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
      object: [], 
      submitVisible: false 
    }

    if(this.props.triple) {
      if(Array.isArray(this.props.triple.subject) && this.props.triple.subject.length > 0) {
        this.state.subject = this.props.triple.subject 
      }

      if(Array.isArray(this.props.triple.predicate) && this.props.triple.predicate.length > 0) {
        this.state.predicate = this.props.triple.predicate
      }

      if(Array.isArray(this.props.triple.object) && this.props.triple.object.length > 0) {
        this.state.object = this.props.triple.object 
      }      
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
      }

      console.log('component did update', this.state)

      if(this.state.subject.length > 0 && this.state.predicate.length > 0 && this.state.object.length > 0) {
        console.log('yes we have it')
        this.setState({
          submitVisible: true 
        })
      }
    }
  }

  onTripleAttributeSelect(attribute) {
    if(this.props.concept) {
      this.props.actions.boundTripleAttributeSelected(attribute)
    }
  }

  onTripleSubmit() {
    
    if(this.state.subject.length > 0 && this.state.predicate.length > 0 && this.state.object.length > 0) {
      const predicateWords = _.flatten(_.map(this.state.predicate, 'words'))
      const predicate = _.map(predicateWords, 'value').join(' ')

      const subjectWords = _.flatten(_.map(this.state.subject, 'words'))
      const subject = _.map(subjectWords, 'value').join(' ')

      const objectWords = _.flatten(_.map(this.state.object, 'words'))
      const object = _.map(objectWords, 'value').join(' ')

      this.props.actions.boundAddTriple({
        subject: subject, 
        predicate: predicate, 
        object: object, 
        sentenceId: this.props.sentence.sentenceId
      })

      this.props.actions.boundsetAutoSubjectMovement(false)
      this.props.actions.boundsetAutoObjectMovement(false)
      this.props.actions.boundTripleAttributeSelected('subject')
    }
  }

  render() {
    return (
      <ExtractedTripleItemComponent
        onTripleAttributeSelect={this.onTripleAttributeSelect}
        onTripleSubmit={this.onTripleSubmit}
        concept={this.props.concept}
        subject={this.props.triple ? this.props.triple.subject : []}
        predicate={this.props.triple ? this.props.triple.predicate: []}
        object={this.props.triple ? this.props.triple.object : []}
        selectedAttribute={this.props.selectedAttribute}
        submitVisible={this.state.submitVisible}
        color={this.props.color}
        extractionError={this.props.extractionError}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    sentence: state.fetchedSentence, 
    selectedAttribute: state.selectedTripleAttribute, 
    extractedTriples: state.extractedTriples, 
    extractionError: state.extractionError
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtractedTripleItem) 