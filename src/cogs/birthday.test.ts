import sinon, { SinonStub } from 'sinon';
import { getDateFromArgs, isInDatabase, isDuplicateEntry, listUsers, updateEntry } from './birthday';
import { BirthdayCog } from './cog';
describe('birthday', () => {
  it("should list all birthdays", async () => {
    let anyStub: SinonStub = sinon.stub();
    let users: Array<object> = [
      {
        id: 12345,
        date: "01/01/2000",
        username: "testName"
      }
    ];

    anyStub.returns(users);

    const db: any = {
      any: anyStub
    }
    const message: any = {
      author: {
        id: 12345
      },
      client: {
        users: users
      }
    }
    const birthdayLsCog = BirthdayCog.getAppropriateCog(["ls"]);
    let result;

    if(birthdayLsCog) result = await birthdayLsCog.func(message, ['ls'], db);
    expect(db.any.calledOnce).toBeTruthy();
    expect(result).toEqual(`List of everyone's birthday goes as follows:\ntestName - 01/01/2000`);
  });
});

describe('getDateFromArgs', () => {
  it('should get a valid date', () => {
    expect(getDateFromArgs(['01/01/2000'])).toBeDefined();
    expect(getDateFromArgs(['05/15/2004'])).toBeDefined();
  });

  it('should not get an invalid date', () => {
    expect(getDateFromArgs(['01/01/200'])).not.toBeDefined();
    expect(getDateFromArgs(['0250/15/204'])).not.toBeDefined();
  });
});

describe('isInDatabase', () => {
  it('should find the user in the array', () => {
    let testId: number = 2124588682
    let testArray: Array<Object> = [new Object({ id: testId })];
    expect(isInDatabase(testId, testArray)).toBeTruthy();
  });

  it('should not find the user in the array', () => {
    let testId: number = 2124588682
    let testArray: Array<Object> = [new Object({ id: testId + 25 })];
    expect(isInDatabase(testId, testArray)).toBeFalsy();
  })
});

describe('isDuplicateEntry', () => {
  it('should detect that there is a duplicate', () => {
    let testId: number = 2124588682;
    let testDate: string = "December 5, 1981";
    let testArray: Array<Object> = [new Object({ id: testId, date: testDate })];
    expect(isDuplicateEntry(testId, testDate, testArray)).toBeTruthy();
  });

  it('should detect that there is not a duplicate', () => {
    let testId: number = 2124588682;
    let testDate: string = "December 5, 1981";
    let testArray: Array<Object> = [new Object({ id: testId + 25, date: testDate })];
    expect(isDuplicateEntry(testId, testDate, testArray)).toBeFalsy();
  });
});

describe("listUsers", () => {
  it("should list current users", () => {
    let testId: number = 2124588682;
    let testDate: string = "December 5, 1981";
    let testArray: Array<Object> = [new Object({ id: testId, date: testDate })];
    let findStub = sinon.stub();
    findStub.returns({
      username: testId,
      date: testDate
    });
    let users: any = {
      find: findStub
    }

    let returns = listUsers(testArray, users);
    expect(returns).toBe(
      `List of everyone's birthday goes as follows:\n${testId} - ${testDate}`
    );
  });

  it("Should not list a user not actively in the server", () => {
    let testId: number = 2124588682;
    let testDate: string = "December 5, 1981";
    let testArray: Array<Object> = [new Object({ id: testId, date: testDate })];
    let findStub = sinon.stub();
    findStub.returns(undefined);
    let users: any = {
      find: findStub
    }

    let returns = listUsers(testArray, users);
    expect(returns).toBe(
      `List of everyone's birthday goes as follows:\n${undefined} - ${testDate}`
    );
  });
});

describe("updateEntry", () => {
  let testId: number;
  let testDate: string;
  let testArray: Array<Object>;
  let db: any;

  beforeEach(() => {
    testId = 2124588682;
    testDate = "December 5, 1981";
    testArray = [];
    db = {
      query: sinon.spy()
    }
  });

  it("Should add a new entry", async () => {
    let returns = await updateEntry(testId, testDate, testArray, db);
    expect(returns).toEqual('Added new entry!');
    expect(db.query.calledOnce).toBeTruthy();
  });

  it("Should update an existing entry", async () => {
    testArray = [new Object({ id: testId, date: "December 7, 1981" })];

    let returns = await updateEntry(testId, testDate, testArray, db);
    expect(returns).toEqual('Updated entry!');
    expect(db.query.calledOnce).toBeTruthy();
  });

  it("Should not update the db if nothing changed", async () => {
    testArray = [new Object({ id: testId, date: testDate })];

    let returns = await updateEntry(testId, testDate, testArray, db);
    expect(returns).toEqual("Name and date already in the database, so I'm not gonna re-add it.");
    expect(db.query.callCount).toBe(0);
  });
});