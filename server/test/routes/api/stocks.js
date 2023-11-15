import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';

describe('/api/stocks', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['stocks']);
    testSession = session(app);
  });

  it('fetch all stocks from the Stocks table', async () => {
    const response = await testSession.get('/api/stocks').expect(StatusCodes.OK);
    console.log(response.body);
  });

  it('fetch one stock from the Stocks table', async () => {
    const response = await testSession.get('/api/stocks/5000').expect(StatusCodes.OK);
    console.log(response.body);
  });
});