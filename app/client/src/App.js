import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'; 
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DocumentActions from './actions/documents'

import DocumentOverview from './containers/DocumentOverview'
import SentenceOverview from './containers/SentenceOverview'
import Login from './containers/Login'
import Extract from './containers/Extract'
import AcceptInvite from './containers/AcceptInvite'

class App extends Component {

  componentDidMount() {
    this.props.actions.boundFetchDocuments()
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
    } else if(this.props.documents) {
      return (
        <Router>
          <div className="wrapper">
            <Route exact path="/" component={DocumentOverview}/>
            <Route exact path="/document/:documentId" component={SentenceOverview}/>
            <Route exact path="/extract/:documentId/:sentenceId" component={Extract}/>
            <Route exact path="/invite/:tournamentHash" component={AcceptInvite}/>
          </div>
        </Router>
      );
     } else {
      return (
        <p>Something seems to be off. Please follow up on Twitter.</p>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    documents: state.fetchedDocuments, 
    userAccessToken: state.loggedInUser.accessToken
  }
}

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, DocumentActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 
