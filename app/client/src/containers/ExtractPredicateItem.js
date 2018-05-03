import React, { Component } from 'react';
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ExtractPredicateItemComponent from '../components/ExtractPredicateItem'

class ExtractPredicateItem extends Component {

  constructor(props) {
    super(props)

    this.onPredicateClick = this.onPredicateClick.bind(this)
  }

  onPredicateClick() {
    //this.props.actions.setExtractingStage('object')
    this.props.actions.setTriplePredicate({ value: this.props.value, id: this.props.id })
  }

  render() {
    return (
      <ExtractPredicateItemComponent
        value={this.props.value}
        id={this.props.id}
        onPredicateClick={this.onPredicateClick}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    stage: state.extractingStage
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtractPredicateItem); 