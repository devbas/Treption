import React, { Component } from 'react';
import ExtractComponent from '../components/Extract'; 

class Extract extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const documentId = this.props.match.params.documentId
    const sentenceId = this.props.match.params.sentenceId

    
  }

  render() {
    return(
      <ExtractComponent/>
    )
  }
}

export default Extract;