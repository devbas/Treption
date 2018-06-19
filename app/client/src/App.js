import React, { Component } from 'react'
import './App.css'
import './assets/css/animate.css'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DocumentActions from './actions/documents'
import * as UserActions from './actions/users'

import DocumentOverview from './containers/DocumentOverview'
import SentenceOverview from './containers/SentenceOverview'
import Login from './containers/Login'
import Extract from './containers/Extract'

class App extends Component {

  componentDidMount() {
    this.props.actions.boundFetchPlayer()
  }

  render() {
    const url = new URL(window.location.href);
    if(url.searchParams.get("loginredirect")) {
      return (
        <Router>
          <div className="wrapper">
            <Route exact path="*" component={Login}/>
          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <div className="wrapper">
            <Route exact path="/" component={DocumentOverview}/>
            <Route exact path="/document/:documentId" component={SentenceOverview}/>
            <Route exact path="/extract/:documentId/:sentenceId" component={Extract}/>
          </div>
        </Router>
      );
     }
  }
}

function mapStateToProps(state) {
  return {
    userAccessToken: state.loggedInUser.accessToken
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, DocumentActions, UserActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 
