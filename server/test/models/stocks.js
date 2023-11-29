import assert from 'assert';
import _ from 'lodash';
import path from 'path';
import { v4 as uuid } from 'uuid';

import helper from '../helper.js';
import models from '../../models/index.js';
import { StatusCodes } from 'http-status-codes';

describe('models.Stock', () => {
  beforeEach(async () => {
    await helper.loadFixtures([]);
  });

  it('creates a new Stock record', async () => {
    assert.deepStrictEqual(await models.Stock.count(), 0);
    const record = await models.Stock.create({
      Ticker: 'This is a test Ticker',
      About: 'This is longer descriptive About',
    });
    console.log(record);
    assert.deepStrictEqual(await models.Stock.count(), 1);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.Ticker, 'This is a test Ticker');
    assert.deepStrictEqual(record.About, 'This is longer descriptive About');
  });

});