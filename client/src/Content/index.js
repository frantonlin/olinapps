import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
var axios  = require('axios');

class Content extends Component {
  state = {
    authText: '',
  };

  handleTest = () => {
    var content = this;
    axios.get('/api/login')
    .then(function (response) {
      content.setState({authText: JSON.stringify(response.data)});
    })
    .catch(function (error) {
      content.setState({authText: error.message});
    });
  };

  render() {
    return (
      <div>
        <br/>
        <RaisedButton label="Get User"
            onClick={this.handleTest} />
        <p>{this.state.authText}</p>
      </div>
    );
  }
}

export default Content;