import PropTypes from 'prop-types';
import React from 'react';
import styles from './Tabs.module.css';

const Tabs = (props) => {
  const { children, activeTab, ACTIVETAB } = props;

  const childrenWrapped = React.Children.map(children, (child, key) => {
    return React.cloneElement(child, {
      activeTab: activeTab,
      ACTIVETAB: ACTIVETAB,
    });
  });

  return <section className="tabs">{childrenWrapped}</section>;
};

Tabs.propTypes = {
  children: PropTypes.node,
  activeTab: PropTypes.string,
  ACTIVETAB: PropTypes.object,
};

const Tab = (props) => {
  const { children, activeTab, id } = props;
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
};

const TabHeader = (props) => {
  const { children, activeTab } = props;
  return (
    <section className={styles.tabHeaderContainer}>
      {children.map((child, key) => {
        const { id } = child.props;
        return (
          <section
            key={key}
            className={`${styles.tabHeader} ${styles.border} ${
              activeTab === id ? styles.borderActive : ''
            }`}
          >
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
  activeTab: PropTypes.string,
  ACTIVETAB: PropTypes.object,
  id: PropTypes.string,
};
export { Tab, Tabs, TabHeader };
