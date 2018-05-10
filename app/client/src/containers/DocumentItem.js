import React, { Component } from 'react'
import DocumentItemComponent from '../components/DocumentItem'
import { blendColors } from '../utils'

class DocumentItem extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      backgroundColor: ''
    }
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

  render() {
    return (
      <DocumentItemComponent 
        title={this.props.document.value.substring(0,40)} 
        id={this.props.document.documentId}
        backgroundColor={this.state.backgroundColor}/>
    )
  }
}

export default DocumentItem