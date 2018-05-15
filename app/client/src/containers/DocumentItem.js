import React, { Component } from 'react'
import DocumentItemComponent from '../components/DocumentItem'
import { blendColors } from '../utils'
import * as UserActions from '../actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class DocumentItem extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      backgroundColor: ''
    }

    this.onExtractClick = this.onExtractClick.bind(this)
  }

  componentDidMount() {
    
    const baseBackgroundColor = [0,0,0,0.8]
    const documentColorArray = this.props.document.color ? this.props.document.color.split(',') : [0,0,0]
    documentColorArray.push(0.4)

    const backgroundColor = blendColors(baseBackgroundColor, documentColorArray.map(Number))
    const backgroundColorRgba = `rgba(${backgroundColor.join()}`

    this.setState({
      backgroundColor: backgroundColorRgba
    })
  }

  onExtractClick() {
    this.props.actions.boundSetUserAction('documentExtractClick', this.props.document.documentId)
  }

  render() {
    return (
      <DocumentItemComponent 
        title={this.props.document.value.substring(0,40)} 
        id={this.props.document.documentId}
        backgroundColor={this.state.backgroundColor}
        onExtractClick={this.onExtractClick}/>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentItem); 