const express = require('express');
const router = express.Router();

const configs = require('../util/config')

const redis = require('../redis')

const { getAsync, setAsync } = require('../redis/index.js')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const counter = await getAsync('added_todos')

  res.send({
    "added_todos": counter === null ? 0 : parseInt(counter)
  });
});

module.exports = router;
