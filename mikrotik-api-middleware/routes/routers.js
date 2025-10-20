const express = require('express');
const router = express.Router();

// Temporary in-memory storage for routers
let routers = [];

/**
 * Add a new router
 * POST /api/routers/add
 */
router.post('/add', (req, res) => {
  const { name, host, user, pass, port } = req.body;

  if (!name || !host || !user || !pass) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newRouter = {
    id: Date.now(),
    name,
    host,
    user,
    pass,
    port: port || 8728
  };

  routers.push(newRouter);

  res.status(200).json({
    message: '✅ Router added successfully',
    router: newRouter
  });
});

/**
 * List all routers
 * GET /api/routers
 */
router.get('/', (req, res) => res.json(routers));

/**
 * Helper functions for other routes to use dynamically
 */
function getRouterById(id) {
  // Ensure id is a number, because Date.now() returns number
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return routers.find(r => r.id === numericId);
}

function getAllRouters() {
  return routers;
}

module.exports = {
  router,        // For mounting in index.js
  getRouterById, // For hotspot.js or other routes
  getAllRouters
};
