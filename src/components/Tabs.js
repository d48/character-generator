import PropTypes from "prop-types";
import React from "react";

const Tabs = (props) => {
  const { children } = props;
  return <section className="row">{children}</section>;
};

Tabs.propTypes = {
  children: PropTypes.node,
};

export default Tabs;
