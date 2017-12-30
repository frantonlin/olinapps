import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const DialogLoadingIndicator =({
    isLoading, loadingSize,
    dialogWidth, dialogHeight, muiTheme }) => {
  const style = {
    loadingContainer: {
      position: 'absolute',
      left: '0px',
      top: '0px',
      backgroundColor: 'rgba(0,0,0,0.2)',
      width: '100%',
      height: '100%',
      zIndex: isLoading ? '99':'-1',
    },
    loading: {
      backgroundColor: 'transparent',
      borderRadius: '0',
      boxShadow: 'none'
    },
  };
  return (
    <div style={style.loadingContainer}>
      <RefreshIndicator
          size={loadingSize}
          left={dialogWidth/2-loadingSize/2}
          top={dialogHeight/2-loadingSize/2}
          loadingColor={muiTheme.palette.accent1Color}
          status={isLoading ? "loading":"hide"}
          style={style.loading} />
    </div>
  );
};
DialogLoadingIndicator.defaultProps = {
  loadingSize: 60
};

export default muiThemeable()(DialogLoadingIndicator);
