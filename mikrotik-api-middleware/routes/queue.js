const express = require('express');
const { connect } = require('@f5eng/mikronode'); // ✅ Correct way to import

const router = express.Router();

router.post('/add', async (req, res) => {
  const { host, user, pass, target, maxLimit } = req.body;

  if (!host || !user || !pass || !target || !maxLimit) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const conn = await connect({
      host,
      user,
      password: pass
    });

    const chan = await conn.openChannel();

    const result = await chan.write('/queue/simple/add', {
      target,
      'max-limit': maxLimit
    });

    await chan.close();
    await conn.close();

    res.json({ message: 'Queue added successfully', result });

  } catch (error) {
    console.error('Error adding queue:', error.message);
    res.status(500).json({ error: 'Failed to add queue', details: error.message });
  }
});

module.exports = router;
