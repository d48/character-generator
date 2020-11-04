import PropTypes from 'prop-types';
import React from 'react';

const Tabs = (props) => {
  const { children } = props;
  return children;
};

Tabs.propTypes = {
  children: PropTypes.node,
};

const Tab = (props) => {
  const { title, children } = props;
  return (
    <section>
      <header>
        <h2>{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  );
};

Tab.displayName = 'Tab';
Tab.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export { Tab, Tabs };
