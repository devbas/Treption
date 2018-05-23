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
  }

  onConsentClick() {

    // Update tournament with competitorId === userId 

    this.setState({
      joinedConsent: true 
    })
  }

  onLoginClick() {
    // Login user with creds state.email, state.password
  }

  onEmailChange(event) {
    this.setState({email: event.target.value})
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value})
  }

  componentDidMount() { 
    console.log('hash: ', this.state.hash)

    this.props.actions.boundFetchTournamentStatus(this.state.hash)

    if(getCookie('accessToken')) {
      this.setState({
        isLoggedIn: true 
      })
    } else {
      // Check if tournament is still open

      // Check if user is logged in, if not, show login      
    }

  }

  render() {
    return (
      <AcceptInviteComponent
        isLoggedIn={this.state.isLoggedIn}
        isTournamentOpen={this.props.inviteTournamentStatus}
        joinedConsent={this.state.joinedConsent}
        email={this.state.email}
        password={this.state.password}
        onLoginClick={this.onLoginClick}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
        onConsentClick={this.onConsentClick}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    inviteTournamentStatus: state.inviteTournamentStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AcceptInvite);