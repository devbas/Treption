import React, { Component } from 'react'
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ExtractedTripleItemComponent from '../components/ExtractedTripleItem'

class ExtractedTripleItem extends Component {

  constructor(props) {
    super(props) 

    this.onTripleAttributeSelect = this.onTripleAttributeSelect.bind(this) 
  }

  onTripleAttributeSelect(attribute) {
    this.props.actions.boundTripleAttributeSelected(attribute)
  }

  render() {
    return (
      <ExtractedTripleItemComponent {...this.props} onTripleAttributeSelect={this.onTripleAttributeSelect}/>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtractedTripleItem); 