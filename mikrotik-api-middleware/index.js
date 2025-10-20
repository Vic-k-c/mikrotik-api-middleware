// routes/routers.js
let routers = [];

function getRouterById(id) {
  return routers.find(r => r.id === id);
}

function addRouter(router) {
  router.id = Date.now();
  routers.push(router);
  return router;
}

// Optional: API endpoint to list routers
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(routers);
});

router.post('/add', (req,
