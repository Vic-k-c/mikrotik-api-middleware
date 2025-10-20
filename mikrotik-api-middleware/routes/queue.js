const express = require('express');
const router = express.Router();
const { connectToRouter } = require('../services/mikrotikClient');
const { getRouterById } = require('./routers'); // fetch router dynamically

/**
 * ➕ Add/Update Queue
 */
router.post('/add', async (req, res) => {
  const { routerId, target, maxLimit } = req.body;

  if (!routerId || !target || !maxLimit) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const routerInfo = getRouterById(routerId);
  if (!routerInfo) return res.status(404).json({ error: 'Router not found' });

  try {
    const connection = await connectToRouter(routerInfo.host, routerInfo.user, routerInfo.pass);
    const chan = await connection.openChannel();

    // MikroTik Queue add/update command
    await chan.write([
      '/queue/simple/add',
      `=name=${target}`,
      `=target=${target}`,
      `=max-limit=${maxLimit}`
    ]);

    await chan.close();
    await connection.close();

    res.status(200).json({
      message: `✅ Queue '${target}' added/updated on '${routerInfo.name}'.`
    });

  } catch (error) {
    console.error('❌ Queue error:', error);
    res.status(500).json({
      error: 'Failed to add/update queue',
      details: error.message
    });
  }
});

module.exports = router;
