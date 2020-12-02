import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CharacterGeneratorHeader from './CharacterGeneratorHeader';
import AttributeSelector from './AttributeSelector';
import IdeasGrid from './IdeasGrid';
import { Tabs, Tab, TabHeader } from './Tabs';
import { BsGridFill, BsBrightnessHighFill } from 'react-icons/bs';
import styles from './Tabs.module.css';
import stylesApp from './CharacterGenerator.module.css';

const ACTIVETAB = {
  GENERATOR: 'generator',
  IDEASGRID: 'ideasgrid',
};

const CharacterGenerator = (props) => {
  const { attributes, settings, ideasGrid } = props;
  const [activeTab, setActiveTab] = useState(ACTIVETAB.IDEASGRID);

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
              activeTab === ACTIVETAB.IDEASGRID ? styles.tabHeaderActive : ''
            }
            onClick={() => activeTabHandler(ACTIVETAB.IDEASGRID)}
            id="ideasgrid"
          >
            <BsGridFill className={styles.iconStyle} /> Ideas Grid
          </h2>
          <h2
            className={
              activeTab === ACTIVETAB.GENERATOR ? styles.tabHeaderActive : ''
            }
            onClick={() => activeTabHandler(ACTIVETAB.GENERATOR)}
            id="generator"
          >
            <BsBrightnessHighFill className={styles.iconStyle} /> More Ideas
          </h2>
        </TabHeader>
        <Tab id="ideasgrid" activeTabHandler={activeTabHandler}>
          <IdeasGrid attributes={ideasGrid} />
        </Tab>
        <Tab id="generator">
          <AttributeSelector
            buttonLabel={settings.buttonLabel}
            attributes={attributes}
          />
        </Tab>
      </Tabs>
      <section className={`row ${stylesApp.footer}`}>
        <p>
          &copy; 2020 - Artist tool created by{' '}
          <a
            href="https://github.com/d48"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ryan Regalado
          </a>
        </p>
      </section>
    </section>
  );
};

CharacterGenerator.propTypes = {
  attributes: PropTypes.array,
  settings: PropTypes.object,
  ideasGrid: PropTypes.array,
};

export default CharacterGenerator;
