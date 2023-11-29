#!/usr/bin/env node

import 'dotenv/config';
import path from 'path';
import { unlink, writeFile } from 'fs/promises';

import models from '../models/index.js';
import s3 from '../lib/s3.js';

const token = process.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN;
const url = 'https://api.airtable.com/v0/appJOKxKhNDGssp7W/Dow?view=Grid%20view';

fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((response) => response.json())
  .then(async (data) => {
    console.log(data);
    for (const record of data.records) {
      let Images;

      if (record.fields.Images.length > 0) {
        const image = record.fields.Images[0];
        const { filename, url } = image;
        const filePath = path.resolve(filename);

        try {
          const response = await fetch(url);
          const arrayBuffer = await response.arrayBuffer();
          await writeFile(filePath, Buffer.from(arrayBuffer));
          const key = path.join('uploads', filename);
          await s3.putObject(key, filePath);
          Images = filename;
        } catch (err) {
          console.log(err);
        } finally {
          await unlink(filePath);
        }
      }

      await models.Stock.create({
        Ticker: record.fields.Ticker,
        Company: record.fields.Company,
        Founded: record.fields.Founded,
        About: record.fields.About,
        Industry: record.fields.Industry,
        Images
      });
    }
  });