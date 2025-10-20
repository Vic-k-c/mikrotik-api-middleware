const express = require('express');
const { connect } = require('@f5eng/mikronode');

const router = express.Router();

/**
 * ➕ Add Hotspot User
 */
router.post('/', async (req, res) => {
  const { host, user, pass, username, password } = req.body;

  if (!host || !user || !pass || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1️⃣ Connect to MikroTik router
    const connection = await connect(host, user, pass);

    // 2️⃣ Open channel
    const chan = await connection.openChannel();

    // 3️⃣ Execute add command
    await chan.write([
      '/ip/hotspot/user/add',
      `=name=${username}`,
      `=password=${password}`
    ]);

    // 4️⃣ Close connections
    await chan.close();
    await connection.close();

    res.status(200).json({ message: `✅ Hotspot user '${username}' added successfully.` });

  } catch (error) {
    console.error('❌ Router connection error:', error);
    res.status(500).json({ error: 'Router connection failed', details: error.message });
  }
});

/**
 * 🚫 Disable Hotspot User
 */
router.post('/disable', async (req, res) => {
  const { host, user, pass, name } = req.body;

  if (!host || !user || !pass || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const connection = await connect(host, user, pass);
    const chan = await connection.openChannel();

    // Disable the user by name
    await chan.write([
      '/ip/hotspot/user/set',
      `=disabled=yes`,
      `=numbers=${name}` // "numbers" can accept name or .id
    ]);

    await chan.close();
    await connection.close();

    res.status(200).json({ message: `✅ Hotspot user '${name}' disabled successfully.` });

  } catch (error) {
    console.error('❌ Disable error:', error);
    res.status(500).json({ error: 'Failed to disable user', details: error.message });
  }
});

/**
 * ❌ Remove Hotspot User
 */
router.post('/remove', async (req, res) => {
  const { host, user, pass, name } = req.body;

  if (!host || !user || !pass || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const connection = await connect(host, user, pass);
    const chan = await connection.openChannel();

    await chan.write([
      '/ip/hotspot/user/remove',
      `=numbers=${name}`
    ]);

    await chan.close();
    await connection.close();

    res.status(200).json({ message: `✅ Hotspot user '${name}' removed successfully.` });

  } catch (error) {
    console.error('❌ Remove error:', error);
    res.status(500).json({ error: 'Failed to remove user', details: error.message });
  }
});

module.exports = router;
