import PropTypes from 'prop-types';
import React from 'react';
import styles from './Tabs.module.css';

const Tabs = (props) => {
  const { children, activeTab, ACTIVETAB, activeTabHandler } = props;

  const childrenWrapped = React.Children.map(children, (child, key) => {
    return React.cloneElement(child, {
      activeTab: activeTab,
      ACTIVETAB: ACTIVETAB,
      activeTabHandler: activeTabHandler,
    });
  });

  console.log('childrenwrapped', childrenWrapped);
  return <section className="tabs">{childrenWrapped}</section>;
};

Tabs.propTypes = {
  children: PropTypes.node,
  activeTab: PropTypes.string,
  ACTIVETAB: PropTypes.object,
  activeTabHandler: PropTypes.func,
};

const Tab = (props) => {
  const { children, activeTab, ACTIVETAB, id, activeTabHandler } = props;
  return (
    <section className={activeTab === id ? styles.tabActive : styles.tab}>
      <div className={`${styles.content} ${styles.border}`}>{children}</div>
    </section>
  );
};

Tab.displayName = 'Tab';
Tab.propTypes = {
  children: PropTypes.node,
  activeTab: PropTypes.string,
  ACTIVETAB: PropTypes.object,
  id: PropTypes.string,
  activeTabHandler: PropTypes.func,
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
  children: PropTypes.node,
};
export { Tab, Tabs, TabHeader };
