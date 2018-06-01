import React, { Component } from 'react'
import DocumentItemComponent from '../components/DocumentItem'
import { blendColors } from '../utils'
import * as UserActions from '../actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class DocumentItem extends Component {

  constructor(props) {
    super(props)

    this.onExtractClick = this.onExtractClick.bind(this)
  }

  onExtractClick() {
    this.props.actions.boundSetUserAction('documentExtractClick', this.props.document.documentId)
  }

  render() {

    const baseBackgroundColor = [0,0,0,0.8]
    const documentColorArray = this.props.document.color ? this.props.document.color.split(',') : [0,0,0]
    documentColorArray.push(0.6)

    const backgroundColor = blendColors(baseBackgroundColor, documentColorArray.map(Number))
    const backgroundColorRgba = `rgba(${backgroundColor.join()}`

    let documentTitleTrimmed = ''
    if(this.props.document) {
      
      const documentTitle = this.props.document.value 
      const maxLength = 100

      documentTitleTrimmed = documentTitle.substr(0, maxLength);
      documentTitleTrimmed = documentTitleTrimmed.substr(0, Math.min(documentTitleTrimmed.length, documentTitleTrimmed.lastIndexOf(" ")))
    } 

    return (
      <DocumentItemComponent 
        title={`${documentTitleTrimmed}..`} 
        id={this.props.document.documentId}
        backgroundColor={backgroundColorRgba}
        onExtractClick={this.onExtractClick}
        document={this.props.document}/>
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