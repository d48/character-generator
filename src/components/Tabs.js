import PropTypes from 'prop-types';
import React from 'react';
import styles from './Tabs.module.css';

const Tabs = (props) => {
  const { children } = props;
  return <section className="tabs">{children}</section>;
};

Tabs.propTypes = {
  children: PropTypes.element,
};

const Tab = (props) => {
  const { children } = props;
  return (
    <section>
      <div className={`${styles.content} ${styles.border}`}>{children}</div>
    </section>
  );
};

Tab.displayName = 'Tab';
Tab.propTypes = {
  children: PropTypes.element,
};

const TabHeader = (props) => {
  const { children } = props;
  return (
    <section className={styles.tabHeaderContainer}>
      {children.map((child, key) => {
        return (
          <section key={key} className={`${styles.tabHeader} ${styles.border}`}>
            {child}
          </section>
        );
      })}
    </section>
  );
};

TabHeader.displayName = 'TabHeader';
TabHeader.propTypes = {
  children: PropTypes.element,
};
export { Tab, Tabs, TabHeader };
