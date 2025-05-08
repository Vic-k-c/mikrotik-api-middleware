const express = require('express');
const MikroNode = require('@f5eng/mikronode');

const router = express.Router();

router.post('/add', async (req, res) => {
  const { host, user, pass, target, maxLimit } = req.body;

  if (!host || !user || !pass || !target || !maxLimit) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const device = new MikroNode(host);
    const conn = await device.connect(user, pass);
    const chan = conn.openChannel('queue');

    await chan.write('/queue/simple/add', [
      `=name=${target}`,
      `=target=${target}`,
      `=max-limit=${maxLimit}`
    ]);

    await chan.close();
    await conn.close();

    res.json({ message: 'Queue added successfully' });
  } catch (error) {
    console.error('Error adding queue:', error.message);
    res.status(500).json({ error: 'Failed to add queue' });
  }
});

module.exports = router;
