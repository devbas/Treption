import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'; 
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DocumentActions from './actions/documents'
import { getCookie } from './utils'

import DocumentOverview from './containers/DocumentOverview'
import SentenceOverview from './containers/SentenceOverview'
import Login from './containers/Login'
import Extract from './containers/Extract'

class App extends Component {

  componentDidMount() {
    this.props.actions.boundFetchDocuments()
  }

  render() {
    if(!getCookie('accessToken')) {
      return (
        <Router>
          <div className="wrapper">
            <Route exact path="*" component={Login}/>
          </div>
        </Router>
      )
    } else if(getCookie('accessToken') && this.props.documents) {
      return (
        <Router>
          <div className="wrapper">
            <Route exact path="/" component={DocumentOverview}/>
            <Route exact path="/document/:documentId" component={SentenceOverview}/>
            <Route exact path="/extract/:documentId/:sentenceId" component={Extract}/>
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
