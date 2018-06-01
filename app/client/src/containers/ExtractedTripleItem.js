import React, { Component } from 'react'
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ExtractedTripleItemComponent from '../components/ExtractedTripleItem'

class ExtractedTripleItem extends Component {

  constructor(props) {
    super(props) 

    this.onTripleAttributeSelect = this.onTripleAttributeSelect.bind(this) 
    this.onTripleSubmit = this.onTripleSubmit.bind(this)
  }

  onTripleAttributeSelect(attribute) {
    this.props.actions.boundTripleAttributeSelected(attribute)
  }

  onTripleSubmit() {
    this.props.actions.boundAddTriple({
      subject: this.props.triple.subject[0].value, 
      predicate: this.props.triple.predicate[0].value, 
      object: this.props.triple.object[0].value, 
      sentenceId: this.props.sentence.sentenceId
    })
  }

  render() {

    let subject = ''
    let predicate = ''
    let object = ''
    if(this.props.triple.concept) {
      subject = this.props.triple.subject[0].value
      predicate = this.props.triple.predicate[0].value
      object = this.props.triple.object[0].value
    } else {
      subject = this.props.triple.subject 
      predicate = this.props.triple.predicate
      object = this.props.triple.object 
    }

    return (
      <ExtractedTripleItemComponent {...this.props} 
        onTripleAttributeSelect={this.onTripleAttributeSelect}
        onTripleSubmit={this.onTripleSubmit}
        concept={this.props.triple.concept}
        subject={subject}
        predicate={predicate}
        object={object}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    sentence: state.fetchedSentence
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtractedTripleItem); 