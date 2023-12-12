import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

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

  it('creates a new Stock', async () => {
    const response = await testSession.post('/api/stocks').send({Ticker: 'Create Ticker', About: 'Create About'}).expect(StatusCodes.CREATED);

    const record = await models.Stock.findByPk(response.body.id);
    assert.deepStrictEqual(record.Ticker, 'Create Ticker');
    assert.deepStrictEqual(record.About, 'Create About');
  });

  it('updates an existing Stock', async () => {
    await testSession.patch('/api/stocks/5000').send({Ticker: 'Update Ticker', About: 'Update About'}).expect(StatusCodes.OK);
    const record = await models.Stock.findByPk(5000);
    assert.deepStrictEqual(record.Ticker, 'Update Ticker');
    assert.deepStrictEqual(record.About, 'Update About');
  });

  it('deletes an existing Stock', async () => {
    await testSession.delete('/api/stocks/5000').expect(StatusCodes.OK);
    const record = await models.Stock.findByPk(5000);
    assert.deepStrictEqual(record, null);
  });

  it('fetch one Stock record from the table', async () => {
    const response = await testSession.get('/api/stocks/5000').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.Ticker, 'Ticker 5000');
  })
  
});