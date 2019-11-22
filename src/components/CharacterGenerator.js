import React from 'react';
import CharacterGeneratorHeader from './CharacterGeneratorHeader';
import AttributeSelector from './AttributeSelector';

const CharacterGenerator = (props) => {
  const { attributes, settings } = props;

  return (
    <section>
      <CharacterGeneratorHeader
        title={settings.title}
        description={settings.description}
      />
      <AttributeSelector
        buttonLabel={settings.buttonLabel}
        attributes={attributes}
      />
    </section>
  );
}

export default CharacterGenerator;
