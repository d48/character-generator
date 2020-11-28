import React from 'react';
import { render } from './test-utils';
import CharacterGenerator from '../CharacterGenerator';

test('Loads Character Generator with props', () => {
  // arrange
  let props = {
    attributes: [{ name: 'boom', values: ['boom'] }],
    settings: {
      title: 'boom',
      description: 'boom',
    },
    ideasGrid: [
      { name: 'anatomy', attributes: ['boom'] },
      { name: 'anatomy', attributes: ['boom'] },
    ],
  };
  const { container } = render(<CharacterGenerator {...props} />);

  // act / assert
  expect(container.querySelector('h1')).toHaveTextContent(props.settings.title);
  expect(container.querySelector('h2')).toHaveTextContent(
    props.settings.description
  );
  expect(container.querySelectorAll('label')[1]).toHaveTextContent(
    props.attributes[0].name
  );
});
