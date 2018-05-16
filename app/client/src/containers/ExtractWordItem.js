import React, { Component } from 'react'
import ExtractWordItemComponent from '../components/ExtractWordItem'
import _ from 'lodash'
import * as ExtractActions from '../actions/extract'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ExtractWordItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      inactive: this.props.scope.inactive
    }

    this.onWordClick = this.onWordClick.bind(this)
  }

  componentDidMount() {
    if(!this.state.inactive) {
      
      if(this.props.stage === 'subject') {

        const nounWord = _.find(this.props.scope.words, (word) => {
          if(word.pos === 'NN' || word.pos === 'NNS' || word.pos === 'NNP' || word.pos === 'NNPS') {
            return word
          }
        })

        if(!nounWord) {
          this.setState({
            inactive: true 
          })
        }
      }

    }
  }

  onWordClick() {
    if(!this.state.inactive) {
      //this.props.actions.setExtractingStage('predicate')
      
      if(this.props.stage === 'subject') {
        this.props.actions.setTripleSubject(this.props.scope)
      }

      if(this.props.stage === 'object') {
        this.props.actions.setTripleObject(this.props.scope)
      }
    }
  }
  
  render() {
    return (
      <ExtractWordItemComponent
        word={this.props.scope.words.map(w => w.value).join('')}
        inactive={this.state.inactive}
        keystroke={this.props.scope.keystroke}
        onWordClick={this.onWordClick}
      />
    ) 
  }

}

function mapStateToProps(state) {
  return {
    stage: state.extractingStage, 
    triples: state.extractedTriples
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, ExtractActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtractWordItem); 