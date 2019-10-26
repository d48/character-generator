import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterGeneratorHeader from '../CharacterGeneratorHeader';

test('Loads Character Generator Header with title and description', () => {
  const title = 'My title';
  const description = 'This is my description';

  const { container } = render(<CharacterGeneratorHeader title={title} description={description
   }/>);

  expect(container.querySelector('h1')).toHaveTextContent(title);
  expect(container.querySelector('h4')).toHaveTextContent(description);
});
