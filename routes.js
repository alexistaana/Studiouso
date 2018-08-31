const express = require('express');
const bodyParser = require('body-parser');

const { User } = require('./server');
const router = express.Router();

const jsonParser = bodyParser.json();

