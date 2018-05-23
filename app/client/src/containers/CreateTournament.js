import React, { Component } from 'react'
import * as UserActions from '../actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CreateTournamentComponent from '../components/CreateTournament'

class CreateTournament extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tournamentCreated: false,
      tournamentJoined: false 
    }

    this.onCreateClick = this.onCreateClick.bind(this) 
    this.onJoinClick = this.onJoinClick.bind(this)
    this.onPlayClick = this.onPlayClick.bind(this)
  }

  onCreateClick() {
    this.props.actions.boundCreateTournament()
  }

  onJoinClick() {
    this.props.actions.boundJoinTournament()
  }
  
  onPlayClick() {
    this.props.actions.boundStartTournament() 
  }

  render() {
    const hostname = window.location.host
    
    return(
      <CreateTournamentComponent 
        color={this.props.color}
        onCreateClick={this.onCreateClick}
        onJoinClick={this.onJoinClick}
        tournamentCreated={this.props.tournamentCreated}
        tournamentJoined={this.props.tournamentJoined}
        tournament={this.props.tournament}
        hostname={hostname}
        onPlayClick={this.onPlayClick}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    tournamentCreated: state.createdTournament.createdTournament, 
    tournamentJoined: state.createdTournament.joinedTournament, 
    tournament: state.fetchedTournament
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateTournament);