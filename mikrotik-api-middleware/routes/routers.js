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
  return routers.find(r => r.id === id);
}

function getAllRouters() {
  return routers;
}

module.exports = {
  router,
  getRouterById,
  getAllRouters
};
