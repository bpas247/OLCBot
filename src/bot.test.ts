import { onCreate, onCommand } from './bot';
import db, { cleanup } from './test/dbMock';
import sinon from 'sinon';

describe('bot', () => {
  beforeEach(async () => cleanup(db));

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
