import React from 'react';
import { render } from './test-utils';
import CharacterGeneratorHeader from '../CharacterGeneratorHeader';

test('Loads Character Generator Header with title and description', () => {
  // arrange
  const title = 'My title';
  const description = 'This is my description';
  const { container } = render(<CharacterGeneratorHeader title={title} description={description
   }/>);

  // act / assert
  expect(container.querySelector('h1')).toHaveTextContent(title);
  expect(container.querySelector('h2')).toHaveTextContent(description);
});
