require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const hotspotRoutes = require('./routes/hotspot');
const queueRoutes = require('./routes/queue');
const pppoeRoutes = require('./routes/pppoe');
const routersRoutes = require('./routes/routers');

app.use('/hotspot', hotspotRoutes);
app.use('/queue', queueRoutes);
app.use('/pppoe', pppoeRoutes);
app.use('/api/routers', routersRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('✅ MikroTik API Middleware is running');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
