import poundConversion from '../poundConversion';

test('Outputs string with "lbs" appended', () => {
  // arrange, act, assert
  expect(poundConversion(155)).toEqual('155 lbs');
  expect(poundConversion('155')).toEqual('155 lbs');
});