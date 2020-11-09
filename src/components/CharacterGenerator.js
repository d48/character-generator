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

  return (
    <section>
      <CharacterGeneratorHeader
        title={settings.title}
        description={settings.description}
      />
      <Tabs>
        <TabHeader>
          <h2
            className={
              activeTab === ACTIVETAB.GENERATOR ? styles.tabHeaderActive : ''
            }
          >
            Default Generator
          </h2>
          <h2
            className={
              activeTab === ACTIVETAB.IDEASGRID ? styles.tabHeaderActive : ''
            }
          >
            Ideas Grid
          </h2>
        </TabHeader>
        <Tab title="Default generator">
          <AttributeSelector
            buttonLabel={settings.buttonLabel}
            attributes={attributes}
          />
        </Tab>
        <Tab title="Ideas Grid">
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
