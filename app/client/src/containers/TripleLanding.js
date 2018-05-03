import React, { Component } from 'react'
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TripleLandingComponent from '../components/TripleLanding'
import TripleItem from './TripleItem'

class TripleLanding extends Component {

  constructor(props) {
    super(props)

    this.renderTriple = this.renderTriple.bind(this)
    console.log('construct triplelanding')
  }

  renderTriple(triple) {
    return (
      <TripleItem triple={triple}/>
    )
  }

  render() {
    console.log('triplelanding rerender', this.props.triples)
    return (
      <TripleLandingComponent triples={this.props.triples} renderTriple={this.renderTriple}/>
    )
  }

}

function mapStateToProps(state) {
  return {
    //stage: state.extractingStage, 
    triples: state.extractedTriples
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(TripleLanding); 
