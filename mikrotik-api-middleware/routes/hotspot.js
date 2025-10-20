const express = require('express');
const router = express.Router();
const { connectToRouter } = require('../services/mikrotikClient');
const { getRouterById } = require('./routers'); // dynamically fetch router

/**
 * ➕ Add Hotspot User
 */
router.post('/add', async (req, res) => {
  const { routerId, username, password } = req.body;

  if (!routerId || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const routerInfo = getRouterById(routerId);
  if (!routerInfo) return res.status(404).json({ error: 'Router not found' });

  try {
    const connection = await connectToRouter(routerInfo.host, routerInfo.user, routerInfo.pass);
    const chan = await connection.openChannel();

    await chan.write([
      '/ip/hotspot/user/add',
      `=name=${username}`,
      `=password=${password}`
    ]);

    await chan.close();
    await connection.close();

    res.status(200).json({ message: `✅ Hotspot user '${username}' added on '${routerInfo.name}'.` });

  } catch (error) {
    console.error('❌ Router connection error:', error);
    res.status(500).json({ error: 'Router connection failed', details: error.message });
  }
});

/**
 * 🚫 Disable Hotspot User
 */
router.post('/disable', async (req, res) => {
  const { routerId, name } = req.body;

  if (!routerId || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const routerInfo = getRouterById(routerId);
  if (!routerInfo) return res.status(404).json({ error: 'Router not found' });

  try {
    const connection = await connectToRouter(routerInfo.host, routerInfo.user, routerInfo.pass);
    const chan = await connection.openChannel();

    await chan.write([
      '/ip/hotspot/user/set',
      `=disabled=yes`,
      `=numbers=${name}`
    ]);

    await chan.close();
    await connection.close();

    res.status(200).json({ message: `✅ Hotspot user '${name}' disabled on '${routerInfo.name}'.` });

  } catch (error) {
    console.error('❌ Disable error:', error);
    res.status(500).json({ error: 'Failed to disable user', details: error.message });
  }
});

/**
 * ❌ Remove Hotspot User
 */
router.post('/remove', async (req, res) => {
  const { routerId, name } = req.body;

  if (!routerId || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const routerInfo = getRouterById(routerId);
  if (!routerInfo) return res.status(404).json({ error: 'Router not found' });

  try {
    const connection = await connectToRouter(routerInfo.host, routerInfo.user, routerInfo.pass);
    const chan = await connection.openChannel();

    await chan.write([
      '/ip/hotspot/user/remove',
      `=numbers=${name}`
    ]);

    await chan.close();
    await connection.close();

    res.status(200).json({ message: `✅ Hotspot user '${name}' removed from '${routerInfo.name}'.` });

  } catch (error) {
    console.error('❌ Remove error:', error);
    res.status(500).json({ error: 'Failed to remove user', details: error.message });
  }
});

module.exports = router;
