import React, { Component } from 'react'
import * as UserActions from '../actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TournamentComponent from '../components/Tournament'

class Tournament extends Component {

  constructor(props) {
    super(props)

    this.state = {
      popupVisible: false 
    }

    this.onTournamentClick = this.onTournamentClick.bind(this)
  }

  onTournamentClick() {
    this.setState({
      popupVisible: !this.state.popupVisible
    })
  }

  render() {
    return(
      <TournamentComponent 
        onTournamentClick={this.onTournamentClick}
        popupVisible={this.state.popupVisible}
        tournament={this.props.tournament}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    tournament: state.fetchedTournament
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Tournament);