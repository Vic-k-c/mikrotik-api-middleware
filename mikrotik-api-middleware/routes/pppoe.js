
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { host, user, pass, name, password, service } = req.body;

  if (!host || !user || !pass || !name || !password || !service) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  res.status(200).json({
    message: '✅ Mocked PPPoE client added',
    input: { host, user, pass, name, password, service }
  });
});

module.exports = router;
