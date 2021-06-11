require('dotenv').config();
require('./db/mongoose');
const deals = require('./routes/deals')
const orders = require('./routes/orders');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(deals);
app.use(orders);

module.exports = app;