// routes/hotspot.js
const express = require('express');
const MikroNode = require('@f5eng/mikronode');

const router = express.Router();

router.post('/add-user', async (req, res) => {
  const { host, user, pass, username, password } = req.body;

  if (!host || !user || !pass || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const device = new MikroNode(host);
    const conn = await device.connect(user, pass);
    const chan = conn.openChannel('hotspot');

    await chan.write('/ip/hotspot/user/add', [
      `=name=${username}`,
      `=password=${password}`,
    ]);

    await chan.close();
    await conn.close();

    res.json({ message: 'Hotspot user added successfully' });
  } catch (error) {
    console.error('Error adding hotspot user:', error.message);
    res.status(500).json({ error: 'Failed to add hotspot user' });
  }
});

module.exports = router;
