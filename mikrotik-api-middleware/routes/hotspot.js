const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { host, user, pass, username, password } = req.body;

  if (!host || !user || !pass || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  res.status(200).json({
    message: '✅ Mocked hotspot user added',
    input: { host, user, pass, username, password }
  });
});

module.exports = router;
