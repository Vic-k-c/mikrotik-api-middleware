const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { host, user, pass, target, maxLimit } = req.body;

  // Check for missing fields
  if (!host || !user || !pass || !target || !maxLimit) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // ✅ Return mocked success response
  res.status(200).json({
    message: '✅ Mocked queue added successfully',
    input: { host, user, pass, target, maxLimit }
  });
});

module.exports = router;
