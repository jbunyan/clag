'use strict';

const express = require('express');

const PORT = process.env.PORT || 4202;

const server = express()
  .use(express.static('dist', {index: "index.html"}))
  .listen(PORT, () => console.log(`Listening on port: ${PORT}`));

function handle(signal) {
  console.log(`Received ${signal}`);
  process.exit();
}

process.on('SIGTERM', handle);