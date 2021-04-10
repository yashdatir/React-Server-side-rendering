import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import App from '../src/App';
const PORT = 3005;
const app = express();

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);
  const index = path.resolve('public/index.html');
  fs.readFile(index, 'utf8', (err, data) => {
    if (err) {
      console.log('Something Went Wrong! ', err);
      return res.status(500).send('Something went wrong');
    }
    return res
      .status(200)
      .send(
        data.replace(`<div id="root"></div>`, `<div id="root">${app}</div>`)
      );
  });
});

app.listen(PORT, () => {
  console.log(PORT);
  console.log(process.env.NAME);
});
