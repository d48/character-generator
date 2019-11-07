import React from 'react';
import { render, fireEvent } from './test-utils';
import AttributeSelectorHeader from '../AttributeSelectorHeader';

test('Loads Attribute Selector Header with checkbox and click handler', () => {
  // arrange
  const selectall = true;
  const obj = {
    onClickHandler: () => {}
  };

  jest.spyOn(obj, 'onClickHandler');

  const { container } = render(<AttributeSelectorHeader selectall={selectall} onClickSelectAllHandler={obj.onClickHandler} />);

  // act
  fireEvent.click(container.querySelector('#selectall'));

  // assert
  expect(container.querySelector('input')).toHaveAttribute('checked');
  expect(obj.onClickHandler).toHaveBeenCalled();
});
