import React from 'react';

function CharacterGeneratorHeader(props) {
  return (
    <div data-testid="chargen-header">
      <h1>{props.title}</h1>
      <h4>{props.description}</h4>
    </div>
  )
}

export default CharacterGeneratorHeader;
