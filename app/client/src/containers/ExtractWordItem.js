import React, { Component } from 'react';
import ExtractWordItemComponent from '../components/ExtractWordItem'; 

class ExtractWordItem extends Component {

  constructor(props) {
    super(props)
    console.log('extractworditem: ', this.props.scope)
  }
  
  render() {
    return (
      <ExtractWordItemComponent
        word={this.props.scope.words.map(w => w.value).join('')}
        inactive={this.props.scope.inactive}
        keystroke={this.props.scope.keystroke}
      />
    ) 
  }

}

export default ExtractWordItem