import React from 'react';
import { render, fireEvent, getByTestId } from './test-utils';
import AttributeSelector from '../AttributeSelector';
import { ATTRIBUTES } from '../../config';

let containerTest = null;

beforeEach(() => {
  // arrange
  let { container } = render(
    <AttributeSelector
      buttonLabel="Generate Character"
      attributes={ATTRIBUTES}
    />
  );
  containerTest = container;
});

afterEach(() => {
  containerTest = null;
});

test('Loads Attribute Selector with "Deselect All" checkbox and click handler that effects attribute list,', () => {
  const firstCheckbox = containerTest.querySelector('input[type="checkbox"]');
  const firstLabel = containerTest.querySelector('label');
  const attributeListFirstCheckbox = containerTest.querySelector(
    '[data-testid="attribute-list"] input[type="checkbox"]'
  );

  // assert
  expect(firstCheckbox).toHaveAttribute('checked');
  expect(firstLabel).toHaveTextContent('Deselect All');
  expect(attributeListFirstCheckbox).toHaveAttribute('checked');

  // act
  fireEvent.click(firstCheckbox);

  // assert
  expect(firstCheckbox).not.toBeChecked();
  expect(attributeListFirstCheckbox).not.toBeChecked();
  expect(firstLabel).toHaveTextContent('Select All');
});

test('Loads Attribute Selector list of AttributeRows that have click handlers', () => {
  const attributeList = getByTestId(containerTest, 'attribute-list');
  const firstCheckbox = attributeList.querySelector('input[type="checkbox"]');
  const firstLabel = attributeList.querySelector('label');

  // assert
  expect(firstCheckbox).toHaveAttribute('checked');
  expect(firstLabel).toHaveTextContent(/[\w\s]+/g);

  // act
  fireEvent.click(firstCheckbox);

  // assert
  expect(firstCheckbox).not.toBeChecked();
});

test('Loads Attribute Selector with button and click handler to generate attributes', () => {
  const button = containerTest.querySelector('button');

  // act
  fireEvent.click(button);

  // assert
  expect(button).toHaveTextContent(/[\w\s]+/g);
});
