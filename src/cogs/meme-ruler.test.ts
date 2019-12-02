import MemeRulerCog, { listCounts, updateCount } from "./meme-ruler";
import createDb, { cleanup } from "../test/dbMock";
import { IDatabase, IMain } from "pg-promise";
import pgPromise from "pg-promise";

describe("memes", () => {
  let db: IDatabase<any>;
  let pgp: IMain;

  beforeAll(() => {
    pgp = pgPromise();
    db = createDb(pgp);
  });
  beforeEach(async () => cleanup(db));
  afterAll(() => pgp.end());

  describe("start", () => {});
  // describe("ls", () => {
  //   let args: Array<string> = ["ls"];
  //   let message: any = {
  //     guild: {
  //       fetchMember: sinon.stub()
  //     },
  //     client: {
  //       users: ["user1"]
  //     }
  //   };
  //   let db: any = {
  //     any: sinon.stub()
  //   };

  //   let memesCog = MemeRulerCog.getAppropriateCog(["ls"]);
  //   let memes: Function;

  //   if (memesCog) memes = memesCog.func;

  //   beforeEach(() => {
  //     db.any = sinon.stub();
  //   });

  //   it("should respond that it couldnt access the db", async () => {
  //     db.any.returns(undefined);
  //     let returns: string | undefined = await memes(message, args, db);
  //     expect(returns).toEqual("Could not access database");
  //   });

  //   it("should reply that no memes have been posted", async () => {
  //     db.any.returns([]);
  //     let returns: string | undefined = await memes(message, args, db);
  //     expect(returns).toEqual('Nobody has posted any memes yet :(');
  //   });
  // });
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

    it("should add a new entry", async () => {
      let returns: string = await updateCount(user, newCount, db);

      expect(returns).toEqual("Added new entry!");
    });
  });
});
