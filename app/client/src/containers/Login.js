import React, { Component } from 'react'
import * as UserActions from '../actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LoginComponent from '../components/Login'

class Login extends Component {

  constructor(props) {
    super(props) 

    this.state = {
      email: '', 
      password: ''
    }

    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onLoginClick = this.onLoginClick.bind(this)
  }

  onEmailChange(event) {
    this.setState({email: event.target.value})
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value})
  }

  onLoginClick() {
    if(this.state.email && this.state.password) {
      this.props.actions.boundSetUser(this.state.email, this.state.password)
    }
  }

  render() {
    return (
      <LoginComponent
        onEmailChange={this.onEmailChange}
        onLoginClick={this.onLoginClick}
        emailValue={this.state.email}
        onPasswordChange={this.onPasswordChange}
        userPassword={this.state.password}
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
      actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);