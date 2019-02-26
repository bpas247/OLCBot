import { onCreate, onCommand } from './bot';
import sinon from 'sinon';

const messageMock: any = {
  content: "!ping",
  channel: {
    send: sinon.spy()
  }
}

const dbMock: any = {
  query: sinon.spy()
}

test('Test to make sure it creates the databases', async () => {
  await onCreate(dbMock);

  expect(dbMock.query.callCount === 3).toBeTruthy();
});

test("Test to make sure onCommand can properly resolve the most simple command", async () => {
  await onCommand(messageMock, dbMock);
  expect(messageMock.channel.send.calledWith('Pong!')).toBeTruthy();
})