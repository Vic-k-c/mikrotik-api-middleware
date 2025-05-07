require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const hotspotRoutes = require('./routes/hotspot');
const queueRoutes = require('./routes/queue');
const pppoeRoutes = require('./routes/pppoe');

app.use(express.json());
app.use('/hotspot', hotspotRoutes);
app.use('/queue', queueRoutes);
app.use('/pppoe', pppoeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
