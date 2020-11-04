import PropTypes from "prop-types";
import React from "react";

const Tabs = (props) => {
  const { children } = props;
  return <>{children}</>;
};

Tabs.propTypes = {
  children: PropTypes.node,
};

export default Tabs;
