import React from 'react';
import CharacterGeneratorHeader from './CharacterGeneratorHeader';
import AttributeSelector from './AttributeSelector';

const CharacterGenerator = (props) => {
  const { attributes, settings } = props;

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
