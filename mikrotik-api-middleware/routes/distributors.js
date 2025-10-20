const express = require('express');
const router = express.Router();
const distributorService = require('../services/distributorService');

// ===========================
// POST - Create a new distributor
// ===========================
router.post('/', async (req, res) => {
  try {
    const { name, email, contact } = req.body;

    if (!name || !email || !contact) {
      return res.status(400).json({ error: 'Name, email, and contact are required' });
    }

    const newDistributor = await distributorService.createDistributor({ name, email, contact });
    res.status(201).json(newDistributor);
  } catch (err) {
    console.error('Error creating distributor:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===========================
// GET - List all distributors
// ===========================
router.get('/', async (req, res) => {
  try {
    const distributors = await distributorService.getAllDistributors();
    res.json(distributors);
  } catch (err) {
    console.error('Error fetching distributors:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===========================
//GET - Get a distributor by ID (optional)
// ===========================
router.get('/:id', async (req, res) => {
  try {
    const distributor = await distributorService.getDistributorById(req.params.id);
    if (!distributor) {
      return res.status(404).json({ error: 'Distributor not found' });
    }
    res.json(distributor);
  } catch (err) {
    console.error('Error fetching distributor:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
