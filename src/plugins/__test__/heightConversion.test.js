import heightConversion from '../heightConversion';

test('Outputs string for height with single and double quotes for feet and inches respectiely', () => {
  // arrange, act, assert
  expect(heightConversion(36)).toEqual(`3' 0"`);
  expect(heightConversion(39)).toEqual(`3' 3"`);
});