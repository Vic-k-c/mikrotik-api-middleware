const express = require('express');
const { connect } = require('@f5eng/mikronode'); // ✅ Import MikroTik connection
const router = express.Router();

// ✅ Mock endpoint to simulate Hotspot user creation
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

// ✅ Disable Hotspot user
router.post('/disable', async (req, res) => {
  const { host, user, pass, name } = req.body;

  if (!host || !user || !pass || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const conn = await connect({ host, user, password: pass });
    const chan = await conn.openChannel();

    await chan.write('/ip/hotspot/user/disable', { '.id': name });

    await chan.close();
    await conn.close();

    res.json({ message: `Hotspot user ${name} disabled` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to disable Hotspot user', details: error.message });
  }
});

// ✅ Remove Hotspot user
router.post('/remove', async (req, res) => {
  const { host, user, pass, name } = req.body;

  if (!host || !user || !pass || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const conn = await connect({ host, user, password: pass });
    const chan = await conn.openChannel();

    await chan.write('/ip/hotspot/user/remove', { '.id': name });

    await chan.close();
    await conn.close();

    res.json({ message: `Hotspot user ${name} removed` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove Hotspot user', details: error.message });
  }
});

module.exports = router;
