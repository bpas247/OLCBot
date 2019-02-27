import sinon, { SinonStub } from "sinon";
import { listCounts, updateCount } from "./meme-ruler";

describe("listCounts", () => {
  it("should list all of the counts", () => {
    let results: any = [
      {
        id: 12345,
        count: 10
      }
    ];

    let users: any = [
      {
        id: 12345,
        username: "testName"
      }
    ];

    let returns = listCounts(results, users);

    expect(returns).toEqual(
      `List of everyone's scores:\n${users[0].username} - ${results[0].count}`
    );
  });
});

describe("updateCount", () => {
  let user: string = "testUser";
  let newCount: number = 37;
  let anyStub: SinonStub = sinon.stub();
  let db: any = {
    any: anyStub,
    query: sinon.spy()
  };

  beforeEach(() => {
    anyStub.returns([]);
  });

  it("should add a new entry", async () => {
    let returns: string = await updateCount(user, newCount, db);

    expect(returns).toEqual(`Added new entry!`);
  });

  it("should add a new entry", async () => {
    anyStub.returns(["stuff"]);
    let returns: string = await updateCount(user, newCount, db);

    expect(returns).toEqual(`Updated entry!`);
  });

  it("should handle db throwing an exception", async () => {
    anyStub.throws();
    let returns: string = await updateCount(user, newCount, db);

    expect(returns).toEqual(`something went wrong`);
  });
});
