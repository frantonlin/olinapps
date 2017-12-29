import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';
import {white} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import LoginButtonContainer from './LoginButtonContainer'

const Header = (props) => {
  const style = {
    appBar: {
      backgroundColor: props.muiTheme.palette.accent1Color,
    },
    title: {
      display: 'table',
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

  return (
    <AppBar
        title={props.title}
        titleStyle={style.title}
        onTitleClick={props.onTitleClick}
        showMenuIconButton={false}
        iconElementRight={
          <span style={style.buttonContainer}>
            <LoginButtonContainer
                hoverColor={style.hoverColor}
                rippleColor={style.rippleColor}
                style={style.button} />
          </span>
        }
        style={style.appBar} />
  );
}

export default muiThemeable() (Header);
