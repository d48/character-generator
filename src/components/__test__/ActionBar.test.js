import React from 'react';
import { render, fireEvent } from './test-utils';
import ActionBar from '../ActionBar';

test('Loads Button with title for action and user can click on it', () => {
  // arrange
  const title = 'Generate';
  const obj = {
    onClickHandler: () => {},
  };
  jest.spyOn(obj, 'onClickHandler');
  const { container } = render(
    <ActionBar buttonLabel={title} onClickHandler={obj.onClickHandler} />
  );

  // act
  fireEvent.click(container.querySelector('button'));

  // assert
  expect(container.querySelector('button')).toHaveTextContent(title);
  expect(obj.onClickHandler).toHaveBeenCalled();
});
