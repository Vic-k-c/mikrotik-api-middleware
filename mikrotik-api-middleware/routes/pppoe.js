const express = require('express');
const router = express.Router();
const { connectToRouter } = require('../services/mikrotikClient');
const { getRouterById } = require('./routers'); // dynamic router lookup

/**
 * ➕ Add PPPoE Client
 */
router.post('/add', async (req, res) => {
  const { routerId, name, password, service } = req.body;

  if (!routerId || !name || !password || !service) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const routerInfo = getRouterById(routerId);
  if (!routerInfo) return res.status(404).json({ error: 'Router not found' });

  try {
    const connection = await connectToRouter(routerInfo.host, routerInfo.user, routerInfo.pass);
    const chan = await connection.openChannel();

    // Add PPPoE client command
    await chan.write([
      '/ppp/secret/add',
      `=name=${name}`,
      `=password=${password}`,
      `=service=${service}`
    ]);

    await chan.close();
    await connection.close();

    res.status(200).json({ message: `✅ PPPoE client '${name}' added on '${routerInfo.name}'.` });
  } catch (error) {
    console.error('❌ PPPoE add error:', error);
    res.status(500).json({ error: 'Failed to add PPPoE client', details: error.message });
  }
});

module.exports = router;
