import { onCreate } from './bot';
import sinon from 'sinon';

const db: any = {
  any: sinon.stub(),
  query: sinon.stub()
}

test('Test to make sure it creates the databases', async () => {
  await onCreate(db);

  expect(db.query.callCount === 3).toBeTruthy();
});

