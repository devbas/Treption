import React, { Component } from 'react'
import DocumentItemComponent from '../components/DocumentItem'

class DocumentItem extends Component {

  constructor(props) {
    super(props)

    
  }

  render() {
    return (
      <DocumentItemComponent title={this.props.document.value.substring(0,40)}/>
    )
  }
}

export default DocumentItem