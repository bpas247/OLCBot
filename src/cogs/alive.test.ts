import { calculateTimeDist } from './alive';
import Alive from './alive';

describe('Time Calculation tests', () => {
  var curTime: Date;
  var addedSeconds: Date;

  beforeEach(() => {
    curTime = new Date('December 17, 1995 00:00:00');
    addedSeconds = new Date(curTime);
  });

  it('Should calculate seconds correctly', () => {
    addedSeconds.setSeconds(addedSeconds.getSeconds() + 5); // Add 5 seconds
    const returns = calculateTimeDist(curTime, addedSeconds);

    expect(valuesAreSame(returns, [0, 0, 0, 5])).toBe(true);
  });
  it('Should calculate minutes correctly', () => {
    addedSeconds.setMinutes(addedSeconds.getMinutes() + 5); // Add 5 seconds
    const returns = calculateTimeDist(curTime, addedSeconds);

    expect(valuesAreSame(returns, [0, 0, 5, 0])).toBe(true);
  });

  it('Should calculate hours correctly', () => {
    addedSeconds.setHours(addedSeconds.getHours() + 5); // Add 5 seconds
    const returns = calculateTimeDist(curTime, addedSeconds);

    expect(valuesAreSame(returns, [0, 5, 0, 0])).toBe(true);
  });

  it('Should calculate days correctly', () => {
    addedSeconds.setDate(20); // Add 3 days
    const returns = calculateTimeDist(curTime, addedSeconds);

    expect(valuesAreSame(returns, [3, 0, 0, 0])).toBe(true);
  });
});

it('Should print out the correct time', () => {
  let expectedOut:string = "I have been alive for: \n0 days, 0 hours, 0 minutes, 0 seconds";
  let testDate:Date = new Date();

  expect(Alive(testDate, testDate)).toBe(expectedOut);
});

function valuesAreSame(arr1:Array<number>, arr2:Array<number>) {
  if (arr1.length !== arr2.length) {
    return false;
  } else {
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
}
