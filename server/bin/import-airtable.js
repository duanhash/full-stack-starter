#!/usr/bin/env node

import fetch from 'node-fetch';
import models from '../models/index.js';

const token = import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN;
const url = 'https://api.airtable.com/v0/appJOKxKhNDGssp7W/Dow ';
fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((response) => response.json())
  .then(async (data) => {
    // console.log(data);
    for (const record of data.records) {
      await models.Item.create({
        Title: record.fields.Title,
        Text: record.fields.Text,
      });
    }
  });