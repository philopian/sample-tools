import React, { Component } from "react";
import PropTypes from "prop-types";

import { Wrapper } from "./styles.js";

class ___titleCase___ extends Component {
  render() {
    const { message } = this.props;
    return (
      <Wrapper>
        <h3>hello new component</h3>
        <p>{message}</p>
      </Wrapper>
    );
  }
}

___titleCase___.propTypes = {
  message: PropTypes.string
};
export default ___titleCase___;
