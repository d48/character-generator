import React from 'react';
import CharacterGeneratorHeader from './CharacterGeneratorHeader';
import AttributeSelectorHeader from './AttributeSelectorHeader';

function CharacterGenerator(props) {
  return (
    <div class="container">
      <CharacterGeneratorHeader
        title={props.settings.title}
        description={props.settings.description}
      />
      <AttributeSelectorHeader
        buttonLabel={props.settings.buttonLabel}
        attributes={props.attributes}
      />
    </div>
  )
}

export default CharacterGenerator;
