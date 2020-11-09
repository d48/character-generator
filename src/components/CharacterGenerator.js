import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CharacterGeneratorHeader from './CharacterGeneratorHeader';
import AttributeSelector from './AttributeSelector';
import IdeasGrid from './IdeasGrid';
import { Tabs, Tab, TabHeader } from './Tabs';
import styles from './Tabs.module.css';

const ACTIVETAB = {
  GENERATOR: 'generator',
  IDEASGRID: 'ideasgrid',
};

const CharacterGenerator = (props) => {
  const { attributes, settings, ideasGrid } = props;
  const [activeTab, setActiveTab] = useState(ACTIVETAB.GENERATOR);

  const activeTabHandler = (id) => {
    if (id === activeTab) return;
    setActiveTab(id);
  };

  return (
    <section>
      <CharacterGeneratorHeader
        title={settings.title}
        description={settings.description}
      />
      <Tabs activeTab={activeTab} ACTIVETAB={ACTIVETAB}>
        <TabHeader>
          <h2
            className={
              activeTab === ACTIVETAB.GENERATOR ? styles.tabHeaderActive : ''
            }
            onClick={() => activeTabHandler(ACTIVETAB.GENERATOR)}
            id="generator"
          >
            Default Generator
          </h2>
          <h2
            className={
              activeTab === ACTIVETAB.IDEASGRID ? styles.tabHeaderActive : ''
            }
            onClick={() => activeTabHandler(ACTIVETAB.IDEASGRID)}
            id="ideasgrid"
          >
            Ideas Grid
          </h2>
        </TabHeader>
        <Tab title="Default generator" id="generator">
          <AttributeSelector
            buttonLabel={settings.buttonLabel}
            attributes={attributes}
          />
        </Tab>
        <Tab
          title="Ideas Grid"
          id="ideasgrid"
          activeTabHandler={activeTabHandler}
        >
          <IdeasGrid attributes={ideasGrid} />
        </Tab>
      </Tabs>
    </section>
  );
};

CharacterGenerator.propTypes = {
  attributes: PropTypes.array,
  settings: PropTypes.object,
  ideasGrid: PropTypes.array,
};

export default CharacterGenerator;
