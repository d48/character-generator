import React from 'react';
import { fireEvent, render } from './test-utils';
import AttributeRow from '../AttributeRow';

test('Can generate an attribute list row with label and input and click handler', () => {
  // arrange
  const obj = {
    onChangeHandler: () => {},
    format: () => {}
  };
  jest.spyOn(obj, "onChangeHandler");

  let props = {
    name: 'boom',
    checked: true,
    onChangeHandler: obj.onChangeHandler,
    result: 'woot'
  };

  const { container } = render(<AttributeRow {...props} />);


  // assert
  expect(container.querySelector('label')).toHaveTextContent(props.name);

  // act
  const checkbox = container.querySelector('input');
  fireEvent.click(checkbox);

  // assert
  expect(obj.onChangeHandler).toHaveBeenCalled();
});
