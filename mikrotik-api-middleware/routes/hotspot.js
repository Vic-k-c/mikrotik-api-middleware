router.post('/add', async (req, res) => {
  console.log('Incoming POST body:', req.body); // see what Bubble sends
  const { routerId, username, password } = req.body;

  // Bubble initialization: skip strict check if body is empty
  if (!routerId && !username && !password) {
    return res.status(200).json({
      message: '✅ Initialization call successful',
      info: 'No real data provided yet'
    });
  }

  // Actual validation for real calls
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
