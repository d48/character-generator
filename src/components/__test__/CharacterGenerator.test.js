import React from 'react';
import { render, fireEvent, screen, getByRole } from './test-utils';
import CharacterGenerator from '../CharacterGenerator';

// arrange
let props = {
  attributes: [{ name: 'boom', values: ['boom'] }],
  settings: {
    title: 'boom',
    description: 'boom'
  },
  ideasGrid: [
    { name: 'anatomy', attributes: ['boom'] },
    { name: 'anatomy', attributes: ['boom'] }
  ]
};

test('Loads Character Generator with props', () => {
  // arrange
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

test('sets active tab', () => {
  // arrange
  const { container } = render(<CharacterGenerator {...props} />);

  // buttons
  const buttonMoreIdeas = container.querySelectorAll('section h2')[2];
  const buttonIdeasGrid = container.querySelectorAll('section h2')[1];

  // act
  fireEvent.click(buttonMoreIdeas);

  // assert More Ideas active
  expect(buttonMoreIdeas).toHaveClass('tabHeaderActive');

  // act
  fireEvent.click(buttonIdeasGrid);

  // assert Ideas Grid active
  expect(buttonIdeasGrid).toHaveClass('tabHeaderActive');

  // act
  fireEvent.click(buttonIdeasGrid);

  // assert Ideas Grid still active
  expect(buttonIdeasGrid).toHaveClass('tabHeaderActive');
});
