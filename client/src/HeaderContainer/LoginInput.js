import React, { Component } from 'react';

class LoginInput extends Component {
  
  render() {
    const {errorText, ...otherProps} = this.props;
    return (
      <FormControl error={errorText!==''} margin="dense">
        <Input fullWidth {...otherProps} />
        {errorText!=='' ? <FormHelperText>{errorText}</FormHelperText> : null}
      </FormControl>
    );
  };
};

export default LoginInput