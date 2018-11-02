import { randomGrab, isValidDate } from './Utilities';

it('Should randomly grab something in the array', () => {
  const arrTest = [5, 4, 9, 2];
  const returns = randomGrab(arrTest);

  var out = false;
  for (var i = 0; i < arrTest.length; i++) {
    if (returns === arrTest[i]) {
      out = true;
    }
  }

  expect(out).toBe(true);
});

describe('Date Validation', () => {
  it('Should return true for a corect date', () => {
    const date = '01/02/1995';

    expect(isValidDate(date)).toBe(true);
  });

  it('Should return false for an incorrect date', () => {
    const date = '13/35/-1992';

    expect(isValidDate(date)).toBe(false);
  });
});
