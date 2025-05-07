const express = require('express');
const router = express.Router();
const connect = require('../services/mikrotikClient');

router.post('/add-user', async (req, res) => {
  const { username, password } = req.body;
  const conn = await connect();
  const chan = await conn.openChannel();
  await chan.write('/ip/hotspot/user/add', [`=name=${username}`, `=password=${password}`]);
  res.send({ message: 'User added' });
});

router.post('/disable-user', async (req, res) => {
  const { username } = req.body;
  const conn = await connect();
  const chan = await conn.openChannel();
  await chan.write('/ip/hotspot/user/disable', [`=numbers=${username}`]);
  res.send({ message: 'User disabled' });
});

module.exports = router;
