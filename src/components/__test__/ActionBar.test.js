import React from 'react';
import { render, fireEvent } from './test-utils';
import ActionBar from '../ActionBar';

test('Loads Button with title for action', () => {
  const title = 'Generate';

  const { container } = render(<ActionBar buttonLabel={title} />);

  expect(container.querySelector('#btn-generate')).toHaveTextContent(title);
});
