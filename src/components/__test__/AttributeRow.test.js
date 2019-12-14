import React from 'react';
import { fireEvent, render } from './test-utils';
import AttributeRow from '../AttributeRow';

test('Can generate an attribute list row with label and input and click handler', () => {
  // arrange
  const obj = {
    onChangeHandler: () => {},
    format: () => {}
  };

  let props = {
    name: 'boom',
    checked: true,
    onChangeHandler: obj.onChangeHandler,
    result: 'woot'
  };

  const { container } = render(<AttributeRow {...props} />);


  // assert
  // todo: needs to spy on changehandler
  expect(container.querySelector('label')).toHaveTextContent(props.name);
  expect(container.querySelector('input').checked).toEqual(true);

  // act
  fireEvent.click(container.querySelector('input'));

  // assert
  // todo: need to spy on onChangeHandler
  expect(container.querySelector('input').checked).toEqual(false);
});
