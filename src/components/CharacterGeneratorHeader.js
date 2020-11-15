import React from 'react';

function CharacterGeneratorHeader(props) {
  return (
    <header data-testid="chargen-header">
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
    </header>
  );
}

export default CharacterGeneratorHeader;
