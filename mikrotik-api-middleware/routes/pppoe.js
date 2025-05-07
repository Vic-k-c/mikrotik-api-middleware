const express = require('express');
const router = express.Router();
const connect = require('../services/mikrotikClient');

router.get('/clients', async (req, res) => {
  const conn = await connect();
  const chan = await conn.openChannel();
  const [data] = await chan.write('/ppp/active/print');
  res.send(data);
});

module.exports = router;
