import { getDateFromArgs } from './birthday';

describe('getDateFromArgs', () => {
  it('should get a valid date', () => {
    expect(getDateFromArgs(['01/01/2000'])).not.toBe(undefined);
    expect(getDateFromArgs(['05/15/2004'])).not.toBe(undefined);
  });

  it('should not get an invalid date', () => {
    expect(getDateFromArgs(['01/01/200'])).toBe(undefined);
    expect(getDateFromArgs(['0250/15/204'])).toBe(undefined);
  });
});
