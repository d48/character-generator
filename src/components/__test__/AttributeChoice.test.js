import React from 'react';
import getAttributeCoice from '../AttributeChoice';

let attributes = [];

beforeEach(() => {
  attributes = [
    { name: 'Hair style', description: 'Spikey, long, short, etc', values: ['Spikey', 'Long', 'Short', 'Bob cut', 'Bun', 'Man-bun', 'Bald', 'Straight', 'Wavy', 'Curly', 'Afro', 'Mohawk'] },
    { name: 'Hair color', description: 'Hazel, dark blue, glowing, etc', values: ['Hazel', 'Dark blue', 'Black', 'Green', 'Brown', 'Grey', 'White', 'Red', 'Yellow', 'Orange'] },
    { name: 'Gender', description: '', values: ['Male', 'Female', 'Androgynous'] },
    { name: 'Name', description: '', values: ['Tiberius', 'Aliso', 'Harmony', 'Griggio', 'Eliana', 'Brarben', 'Hauminor'] },
  ];
});

test('Can get random choice based on attribute keys and type', () => {
  // act
  const results = getAttributeCoice(attributes);

  // assert
  expect(results['Hair style']).toBeDefined();
});

test('Can get random attribute and process values attribute if it is a function', () => {
  // arrange
  attributes.push({
    name: 'RandomAttribute', values: () => 'Random Attribute'
  });

  // act
  const results = getAttributeCoice(attributes);

  // assert
  expect(results['RandomAttribute']).toBe('Random Attribute');
});

test('Can get random choice with name based on gender', () => {
  // arrange
  attributes[2].values = ['Male']

  // act
  let results = getAttributeCoice(attributes);

  // assert
  expect(results['Name']).toBeDefined();

  // arrange
  attributes[2].values = ['Female']

  // act
  results = getAttributeCoice(attributes);

  // assert
  expect(results['Name']).toBeDefined();
});
