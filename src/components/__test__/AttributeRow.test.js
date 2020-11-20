import React from 'react';
import { fireEvent, render } from './test-utils';
import AttributeRow from '../AttributeRow';

let obj = {};
let props = {};

beforeEach(() => {
  // arrange
  obj = {
    onChangeHandler: () => {},
  };

  jest.spyOn(obj, 'onChangeHandler');

  props = {
    name: 'boom',
    checked: true,
    onChangeHandler: obj.onChangeHandler,
    result: 'woot',
    format: (item) => item,
  };
});

test('Can generate an attribute list row with label and input and click handler', () => {
  const tbody = document.createElement('tbody');

  const { container } = render(<AttributeRow {...props} />, {
    container: document.body.appendChild(tbody),
  });

  // assert
  expect(container.querySelector('label')).toHaveTextContent(props.name);
  expect(container.querySelector('.attribute-result')).toHaveTextContent(
    props.result
  );

  // act
  const checkbox = container.querySelector('input');
  fireEvent.click(checkbox);

  // assert
  expect(obj.onChangeHandler).toHaveBeenCalled();
});

test('Can generate an attribute list row with default value hidden if checkbox is unchecked', () => {
  // arrange
  props.checked = false;

  const tbody = document.createElement('tbody');

  const { container } = render(<AttributeRow {...props} />, {
    container: document.body.appendChild(tbody),
  });

  // assert
  expect(container.querySelector('.attribute-result')).toBeEmpty();
});

test('Can generate an attribute list with blank value if result is blank', () => {
  // arrange
  props.result = '';

  const tbody = document.createElement('tbody');

  const { container } = render(<AttributeRow {...props} />, {
    container: document.body.appendChild(tbody),
  });

  // assert
  expect(container.querySelector('.attribute-result')).toBeEmpty();
});

test('Can generate an attribute list with default value if format function is not provided', () => {
  // arrange
  props.format = undefined;

  const tbody = document.createElement('tbody');

  const { container } = render(<AttributeRow {...props} />, {
    container: document.body.appendChild(tbody),
  });

  // assert
  expect(container.querySelector('.attribute-result')).toHaveTextContent(
    props.result
  );
});

test('Can generate an attribute list with value formatted if format function is provided', () => {
  // arrange
  props.format = (item) => item + 'modified';

  const tbody = document.createElement('tbody');

  const { container } = render(<AttributeRow {...props} />, {
    container: document.body.appendChild(tbody),
  });

  // assert
  expect(container.querySelector('.attribute-result')).toHaveTextContent(
    props.result + 'modified'
  );
});
