import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppSearchContainer from '../AppSearchContainer';
import Button from 'material-ui/Button';
var axios  = require('axios');

const styles = theme => ({
  content: {
    paddingTop: '16px',
    ...theme.mixins.gutters({})
  },
});

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
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <AppSearchContainer />
        <Button onClick={this.handleTest}>Get User</Button>
        <p>{this.state.authText}</p>
      </div>
    );
  };
}

export default withStyles(styles)(Content);