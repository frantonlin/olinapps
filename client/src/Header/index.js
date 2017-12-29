import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';
import {white} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import LoginButton from './LoginButton'

class Header extends Component {
  goHome = () => {
    alert('onClick triggered on the title component');
  };

  render() {
    const style = {
      appBar: {
        backgroundColor: this.props.muiTheme.palette.accent1Color,
      },
      title: {
        cursor: 'pointer',
      },
      buttonContainer: {
        display: 'block',
        paddingTop: '5px'
      },
      button: {
        color: 'white',
      },
      hoverColor: fade(white, 0.21),
      rippleColor: fade(white, 0.58),
    };

    let buttons =
      <span style={style.buttonContainer}>
        <LoginButton 
            hoverColor={style.hoverColor}
            rippleColor={style.rippleColor}
            style={style.button} />
      </span>
    ;


    return (
      <AppBar
        title={<span style={style.title}>OlinApps</span>}
        onTitleClick={this.goHome}
        showMenuIconButton={false}
        iconElementRight={
          <span style={style.buttonContainer}>
            <LoginButton 
                hoverColor={style.hoverColor}
                rippleColor={style.rippleColor}
                style={style.button} />
          </span>
        }
        style={style.appBar}
      />
    );
  }
}

export default muiThemeable() (Header);