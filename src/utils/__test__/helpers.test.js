import React from 'react';
import { getRandomIndex, groupByAndSetValue } from '../helpers';

test('Gets the value of a property and creates a new object with value set', () => {
  // arrange
  let arrOfObjects = [
    { name: 'Hair style', description: 'Spikey, long, short, etc' },
    { name: 'Hair color', description: 'Hazel, dark blue, glowing, etc' },
  ];

  let expected = {
    'Hair style': 2,
    'Hair color': 2,
  };

  // act, assert
  expect(groupByAndSetValue(arrOfObjects, 'name', 2)).toEqual(expected);
});

test('Returns a random number from 0 to n where n is passed in', () => {
  // arrange, act, assert
  expect(getRandomIndex(4)).toBeLessThan(4);
  expect(getRandomIndex(2)).toBeLessThan(2);
});
