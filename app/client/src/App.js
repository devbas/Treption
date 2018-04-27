import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'; 

import DocumentOverview from './containers/DocumentOverview';
import SentenceOverview from './containers/SentenceOverview';
import Extract from './containers/Extract'; 

class App extends Component {
  render() {
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

export default App;
