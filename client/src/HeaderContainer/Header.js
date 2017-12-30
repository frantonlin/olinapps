import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';
import {white} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import LoginDialogButton from './LoginDialogButton';

const Header = ({ muiTheme, title, onTitleClick }) => {
  const style = {
    appBar: {
      backgroundColor: muiTheme.palette.accent1Color,
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
        title={title}
        titleStyle={style.title}
        onTitleClick={onTitleClick}
        showMenuIconButton={false}
        iconElementRight={
          <span style={style.buttonContainer}>
            <LoginDialogButton
                hoverColor={style.hoverColor}
                rippleColor={style.rippleColor}
                style={style.button} />
          </span>
        }
        style={style.appBar} />
  );
}

export default muiThemeable() (Header);
