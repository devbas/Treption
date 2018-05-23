import React, { Component } from 'react'
import * as UserActions from '../actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCookie } from '../utils'

import AcceptInviteComponent from '../components/AcceptInvite'

class AcceptInvite extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false, 
      isTournamentOpen: true, 
      joinedConsent: false, 
      email: '', 
      password: '', 
      hash: this.props.match.params.tournamentHash
    }

    this.onConsentClick = this.onConsentClick.bind(this)
    this.onLoginClick = this.onLoginClick.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSuccessMessageClose = this.onSuccessMessageClose.bind(this)
  }

  onConsentClick() {

    // Update tournament with competitorId === userId 
    this.props.actions.boundUpdateTourmanentJoinStatus(this.state.hash)

    this.setState({
      joinedConsent: true 
    })
  }

  onLoginClick() {
    if(this.state.password && this.state.email) {
      this.props.actions.boundSetUser(this.state.email, this.state.password)
    }
    // Login user with creds state.email, state.password
  }

  onEmailChange(event) {
    this.setState({email: event.target.value})
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value})
  }

  onSuccessMessageClose() {
    window.location.replace('/')
  }

  componentDidMount() { 
    console.log('hash: ', this.state.hash)

    this.props.actions.boundFetchTournamentStatus(this.state.hash)

    if(getCookie('accessToken')) {
      this.setState({
        isLoggedIn: true 
      })
    } else {
      if(!this.props.inviteTournamentStatus) {

      } else {

      }
      // Check if tournament is still open

      // Check if user is logged in, if not, show login      
    }

  }

  render() {
    return (
      <AcceptInviteComponent
        isLoggedIn={this.state.isLoggedIn}
        isTournamentOpen={this.props.inviteTournamentStatus}
        joinedConsent={this.props.joinedConsent}
        email={this.state.email}
        password={this.state.password}
        onLoginClick={this.onLoginClick}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
        onConsentClick={this.onConsentClick}
        onSuccessMessageClose={this.onSuccessMessageClose}
        loginError={this.props.loginError}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    inviteTournamentStatus: state.inviteTournamentStatus,
    joinedConsent: state.tournamentJoinStatus, 
    loginError: state.loginError
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AcceptInvite);