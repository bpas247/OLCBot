import { onCreate, onCommand } from './bot';
import sinon from 'sinon';
import pgPromise, { IDatabase, IMain } from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'test',
  user: 'postgres',
  password: (process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : undefined)
});


describe('bot', () => {
  beforeEach(() => {
    db.any("DROP TABLE IF EXISTS birthday");
    db.any("DROP TABLE IF EXISTS memes");
  });
  afterAll(() => {
    pgp.end();
  })
  describe("onCreate", () => {
    it("should not throw an error on create", async () => {
      await onCreate(db);
    });
  });

  describe("onCommand", () => {
    let messageMock: any;

    beforeEach(() => {
      messageMock = {
        content: "!ping",
        channel: {
          send: sinon.spy()
        }
      }
    });

    it("should make sure it can resolve a simple command", async () => {
      await onCommand(messageMock, db);
      expect(messageMock.channel.send.calledWith('Pong!')).toBeTruthy();
    });

    it("should not send a message to a channel if the prefix is invalid", async () => {
      messageMock.content = ">poing";
      await onCommand(messageMock, db);
      expect(messageMock.channel.send.callCount).toEqual(0);
    });

    it("should reply with an unrecognized command if passed in an invalid command", async () => {
      messageMock.content = "!poing";
      await onCommand(messageMock, db);
      expect(messageMock.channel.send.calledWith('Command not recognized: Base Cog undefined')).toBeTruthy();
    });
  });
})
