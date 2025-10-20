const express = require('express');
const router = express.Router();
const { connectToRouter } = require('../services/mikrotikClient');
const { getRouterById } = require('./routers'); // fetch router dynamically

/**
 * ➕ Add Hotspot User
 */
router.post('/add', async (req, res) => {
  console.log('Incoming POST body:', req.body); // debug Bubble input
  const { routerId, username, password } = req.body;

  // Placeholder for initialization if Bubble sends empty fields
  const rId = routerId || 1;
  const user = username || 'InitUser';
  const pass = password || 'InitPass';

  const routerInfo = getRouterById(rId);
  if (!routerInfo) return res.status(404).json({ error: 'Router not found' });

  try {
    // Connect to the selected MikroTik router
    const connection = await connectToRouter(routerInfo.host, routerInfo.user, routerInfo.pass);
    const chan = await connection.openChannel();

    // Add hotspot user
    await chan.write([
      '/ip/hotspot/user/add',
      `=name=${user}`,
      `=password=${pass}`
    ]);

    await chan.close();
    await connection.close();

    res.status(200).json({
      message: `✅ Hotspot user '${user}' added on router '${routerInfo.name}'.`,
      input: req.body
    });
  } catch (error) {
    console.error('❌ Router connection error:', error);
    res.status(500).json({
      error: 'Router connection failed',
      details: error.message
    });
  }
});

/**
 * 🚫 Disable Hotspot User
 */
router.post('/disable', async (req, res) => {
  console.log('Incoming disable body:', req.body);
  const { routerId, name } = req.body;

  const rId = routerId || 1;
  const userName = name || 'InitUser';

  const routerInfo = getRouterById(rId);
  if (!routerInfo) return res.status(404).json({ error: 'Router not found' });

  try {
    const connection = await connectToRouter(routerInfo.host, routerInfo.user, routerInfo.pass);
    const chan = await connection.openChannel();

    await chan.write([
      '/ip/hotspot/user/set',
      `=disabled=yes`,
      `=numbers=${userName}`
    ]);

    await chan.close();
    await connection.close();

    res.status(200).json({
      message: `✅ Hotspot user '${userName}' disabled on router '${routerInfo.name}'.`
    });
  } catch (error) {
    console.error('❌ Disable error:', error);
    res.status(500).json({
      error: 'Failed to disable user',
      details: error.message
    });
  }
});

/**
 * ❌ Remove Hotspot User
 */
router.post('/remove', async (req, res) => {
  console.log('Incoming remove body:', req.body);
  const { routerId, name } = req.body;

  const rId = routerId || 1;
  const userName = name || 'InitUser';

  const routerInfo = getRouterById(rId);
  if (!routerInfo) return res.status(404).json({ error: 'Router not found' });

  try {
    const connection = await connectToRouter(routerInfo.host, routerInfo.user, routerInfo.pass);
    const chan = await connection.openChannel();

    await chan.write([
      '/ip/hotspot/user/remove',
      `=numbers=${userName}`
    ]);

    await chan.close();
    await connection.close();

    res.status(200).json({
      message: `✅ Hotspot user '${userName}' removed from router '${routerInfo.name}'.`
    });
  } catch (error) {
    console.error('❌ Remove error:', error);
    res.status(500).json({
      error: 'Failed to remove user',
      details: error.message
    });
  }
});

module.exports = router;
