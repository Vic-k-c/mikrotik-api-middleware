const express = require('express');
const router = express.Router();
const connect = require('../services/mikrotikClient');

router.post('/add', async (req, res) => {
  const { name, target, maxLimit } = req.body;
  const conn = await connect();
  const chan = await conn.openChannel();
  await chan.write('/queue/simple/add', [
    `=name=${name}`,
    `=target=${target}`,
    `=max-limit=${maxLimit}`
  ]);
  res.send({ message: 'Queue added' });
});

module.exports = router;
