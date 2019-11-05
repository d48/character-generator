import React from 'react';
import CharacterGeneratorHeader from './CharacterGeneratorHeader';
import AttributeSelector from './AttributeSelector';
import Fakerator from 'fakerator';

const CharacterGenerator = (props) => {
  const { attributes, settings } = props;

  window.fakerator = Fakerator();

  console.log('fakerator', window.fakerator.names.name());

  return (
    <div className="container">
      <CharacterGeneratorHeader
        title={settings.title}
        description={settings.description}
      />
      <AttributeSelector
        buttonLabel={settings.buttonLabel}
        attributes={attributes}
      />
    </div>
  );
}

export default CharacterGenerator;
