import React, { Component } from 'react';
import Button from 'material-ui/Button';
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
        <Button onClick={this.handleTest}>Get User</Button>
        <p>{this.state.authText}</p>
      </div>
    );
  }
}

export default Content;