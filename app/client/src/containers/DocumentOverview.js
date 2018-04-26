import React, { Component } from 'react'
import DocumentComponent from '../components/DocumentOverview'
import * as DocumentActions from '../actions/documents'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class DocumentOverview extends Component {
  render() {
    return(
      <DocumentComponent documents={this.props.documents}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
	actions: bindActionCreators({}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentOverview); 