require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Routes
const hotspotRoutes = require('./routes/hotspot');
const queueRoutes = require('./routes/queue');
const pppoeRoutes = require('./routes/pppoe');
const distributorsRoute = require('./routes/distributors'); 
const routersRoutes = require('./routes/routers');

// Middleware
app.use(express.json());

// Use routes
app.use('/hotspot', hotspotRoutes);
app.use('/queue', queueRoutes);
app.use('/pppoe', pppoeRoutes);
app.use('/api/distributors', distributorsRoute); 
app.use('/api/routers', routersRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

