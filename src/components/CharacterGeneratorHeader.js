import React from 'react';

function CharacterGeneratorHeader(props) {
  return (
    <header data-testid="chargen-header">
      <h1>{props.title}</h1>
      <h4>{props.description}</h4>
    </header>
  )
}

export default CharacterGeneratorHeader;
