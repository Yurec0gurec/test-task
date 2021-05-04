const express = require('express');
const photosRouter = require('./routes/photos');
const app = express();
require('dotenv').config();

app.use('/api/photos', photosRouter);

// default URL to API
app.use('/', function (req, res) {
  res.send('node-ex-api works :-)');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);