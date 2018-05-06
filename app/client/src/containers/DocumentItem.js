import React, { Component } from 'react'
import DocumentItemComponent from '../components/DocumentItem'
import { rainbow, getRandomIntInclusive, blendColors } from '../utils'

class DocumentItem extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      backgroundColor: ''
    }
  }

  componentDidMount() {

    //const backgroundColor = rainbow(getRandomIntInclusive(1,5), getRandomIntInclusive(1,3))
    
    const baseBackgroundColor = [0,0,0,0.6]
    const documentColorArray = this.props.document.color ? this.props.document.color.split(',') : [0,0,0]
    documentColorArray.push(0.5)

    const backgroundColor = blendColors(baseBackgroundColor, documentColorArray.map(Number))
    const backgroundColorRgba = `rgba(${backgroundColor.join()}`
    console.log('backgroundColor: ', backgroundColor)
    console.log('doument color: ', documentColorArray.map(Number))
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