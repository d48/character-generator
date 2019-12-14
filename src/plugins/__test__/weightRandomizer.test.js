import React from 'react';
import weightRandomizer from '../weightRandomizer';

test('Randomizes a weight value with default between 30 and 400', () => {
  // arrange, act, assert
  expect(weightRandomizer()).toBeLessThanOrEqual(400);
  expect(weightRandomizer()).toBeGreaterThanOrEqual(30);
});

test('Randomizes a weight value with given range', () => {
  // arrange, act, assert
  expect(weightRandomizer(1,4)).toBeLessThanOrEqual(4);
  expect(weightRandomizer(100, 1000)).toBeGreaterThanOrEqual(100);
});
