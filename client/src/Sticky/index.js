import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  default: {
    position: 'relative',
  },
  sticky: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: 1,
  },
};

class Sticky extends Component {
  state = {
    initialTop: undefined,
    height: undefined,
    sticky: false,
  };

  onScroll = () => {
    requestAnimationFrame(() => {
      this.setState({sticky: window.scrollY >= this.state.initialTop});
    });
  };

  componentDidMount() {
    const boundingClientRect = this.node.getBoundingClientRect();
    this.setState({
      initialTop: boundingClientRect.top,
      height: boundingClientRect.height,
    });
    document.addEventListener('scroll', this.onScroll);
  };

  render() {
    const { classes, children } = this.props;
    return (
      <div ref={div => this.node = div}>
        <div
          className={this.state.sticky ? classes.sticky : classes.default}
          style={this.props.style}
        >
          {children}
        </div>
        {this.state.sticky ? <div style={{height: this.state.height}}></div> : null}
      </div>
    );
  };
}

export default withStyles(styles)(Sticky);
