import React from 'react';
import { render } from './test-utils';
import CharacterGenerator from '../CharacterGenerator';

test('Loads Character Generator with props', () => {
  // arrange
  let props = {
    attributes: [{name: 'boom', values: ['boom']}],
    settings: {
      title: 'boom',
      description: 'boom',
      buttonLabel: 'boom'
    }
  }
  const { container } = render(<CharacterGenerator {...props} />);

  // act / assert
  expect(container.querySelector('h1')).toHaveTextContent(props.settings.title);
  expect(container.querySelector('h2')).toHaveTextContent(props.settings.description);
  expect(container.querySelector('button')).toHaveTextContent(props.settings.buttonLabel);
  expect(container.querySelectorAll('label')[1]).toHaveTextContent(props.attributes[0].name);
});