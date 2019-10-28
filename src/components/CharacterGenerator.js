import React from 'react';
import CharacterGeneratorHeader from './CharacterGeneratorHeader';
import AttributeSelectorHeader from './AttributeSelectorHeader';

const CharacterGenerator = (props) => {
  const { attributes, settings } = props;

  return (
    <div className="container">
      <CharacterGeneratorHeader
        title={settings.title}
        description={settings.description}
      />
      <AttributeSelectorHeader
        buttonLabel={settings.buttonLabel}
        attributes={attributes}
      />
    </div>
  );
}

export default CharacterGenerator;
