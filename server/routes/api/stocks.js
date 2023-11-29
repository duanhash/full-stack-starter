import express from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import models from '../../models/index.js';
import interceptors from '../interceptors.js';
import helpers from '../helpers.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const record = await models.Stock.create(_.pick(req.body, ['Ticker', 'Company', 'Founded', 'About', 'Industry']));
    res.status(StatusCodes.CREATED).json(record.toJSON());
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', async (req, res) => {
  const records = await models.Stock.findAll();
  res.json(records.map((record) => record.toJSON()));
  
})

router.patch('/:id', async (req, res) => {
  try {
    const record = await models.Stock.findByPk(req.params.id);
    await record.update(_.pick(req.body, ['Ticker', 'Company', 'Founded', 'About', 'Industry']));
    res.json(record.toJSON());
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const record = await models.Stock.findByPk(req.params.id);
    res.json(record.toJSON());
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const record = await models.Stock.findByPk(req.params.id);
    await record.destroy();
    res.status(StatusCodes.OK).end();
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

export default router;