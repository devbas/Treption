import React, { Component } from 'react'
import HeaderComponent from '../components/Header'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCookie } from '../utils'

class Header extends Component {

  constructor(props) {
    super(props) 
  }

  render() {
    return (
      <HeaderComponent 
        scope={this.props.scope ? this.props.scope : ''}
        documentId={this.props.documentId ? this.props.documentId : 0}
        userIdentifier={getCookie('identifier')}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    userIdentifier: state.loggedInUser, 
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 