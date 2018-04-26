import React, { Component } from 'react'
import DocumentComponent from '../components/DocumentOverview'
import * as DocumentActions from '../actions/documents'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class DocumentOverview extends Component {

  constructor(props) {
    super(props)

    this.state = {
      files: []
    }

    this.onFileDrop = this.onFileDrop.bind(this)
  }

  onFileDrop(files) {
    console.log('file dropped!')
    /*this.setState({
      files: files
    })*/

    this.props.actions.uploadDocuments(files)
  }

  render() {
    return(
      <DocumentComponent 
        documents={this.props.documents}
        onFileDrop={this.onFileDrop}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
	actions: bindActionCreators(Object.assign({}, DocumentActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentOverview); 