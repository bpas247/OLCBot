import { onCreate, onCommand } from './bot';
import sinon from 'sinon';

const dbMock: any = {
  query: sinon.spy()
}

describe("onCreate", () => {
  it("should create the databases", async () => {
    await onCreate(dbMock);
    expect(dbMock.query.callCount).toEqual(2);  
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
    await onCommand(messageMock, dbMock);
    expect(messageMock.channel.send.calledWith('Pong!')).toBeTruthy();  
  });

  it("should not send a message to a channel if the prefix is invalid", async () => {
    messageMock.content = ">poing";
    await onCommand(messageMock, dbMock);
    expect(messageMock.channel.send.callCount).toEqual(0);  
  });

  it("should reply with an unrecognized command if passed in an invalid command", async () => {
    messageMock.content = "!poing";
    await onCommand(messageMock, dbMock);
    expect(messageMock.channel.send.calledWith('Command not recognized: Base Cog undefined')).toBeTruthy();  
  });
});
