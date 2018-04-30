import React, { Component } from 'react'
import DocumentItemComponent from '../components/DocumentItem'
import { rainbow, getRandomIntInclusive } from '../utils'

class DocumentItem extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      backgroundColor: ''
    }
  }

  componentDidMount() {

    const backgroundColor = rainbow(getRandomIntInclusive(1,5), getRandomIntInclusive(1,3))
    console.log('backgroundColor: ', backgroundColor)

    this.setState({
      backgroundColor: backgroundColor
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