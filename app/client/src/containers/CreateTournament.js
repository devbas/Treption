import React, { Component } from 'react'
import * as UserActions from '../actions/users'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CreateTournamentComponent from '../components/CreateTournament'

class CreateTournament extends Component {

  constructor(props) {
    super(props)

    this.state = {
      popupVisible: false 
    }

  }

  render() {
    return(
      <CreateTournamentComponent 
        color={this.props.color}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateTournament);