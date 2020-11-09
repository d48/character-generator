import React from 'react';
import PropTypes from 'prop-types';
import CharacterGeneratorHeader from './CharacterGeneratorHeader';
import AttributeSelector from './AttributeSelector';
import IdeasGrid from './IdeasGrid';
import { Tabs, Tab, TabHeader } from './Tabs';

const CharacterGenerator = (props) => {
  const { attributes, settings, ideasGrid } = props;

  return (
    <section>
      <CharacterGeneratorHeader
        title={settings.title}
        description={settings.description}
      />
      <Tabs>
        <TabHeader>
          <h2>Default Generator</h2>
          <h2>Ideas Grid</h2>
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
