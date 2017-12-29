import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
var axios  = require('axios');

class LogoutButton extends Component {

  handleLogout = (e) => {
    axios.post('/api/logout')
    .then(function (response) {
      
    })
    .catch(function (error) {
      if (error) {
        
      }
    });
  };

  render() {
    return (
      <FlatButton label="Logout"
          hoverColor={this.props.hoverColor}
          rippleColor={this.props.rippleColor}
          onClick={this.handleLogout}
          style={this.props.style} />
    );
  }
}

export default LogoutButton;