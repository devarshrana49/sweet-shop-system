const express = require('express');
const router = express.Router();
const SweetService = require('../services/sweet.service');
const { verifyToken } = require('../middleware/auth');

// This line is the security guard. It protects ALL routes in this file.
router.use(verifyToken);

// Get all sweets
router.get('/', async (req, res) => {
  try {
    const sweets = await SweetService.getAllSweets();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search sweets
router.get('/search', async (req, res) => {
  try {
    const searchParams = req.query;
    const sweets = await SweetService.searchSweets(searchParams);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get sweet by ID
router.get('/:id', async (req, res) => {
  try {
    const sweet = await SweetService.getSweetById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new sweet
router.post('/', async (req, res) => {
  try {
    const sweet = await SweetService.addSweet(req.body);
    res.status(201).json({
      message: 'Sweet added successfully',
      sweet: sweet
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update sweet
router.put('/:id', async (req, res) => {
  try {
    const sweet = await SweetService.updateSweet(req.params.id, req.body);
    res.json({
      message: 'Sweet updated successfully',
      sweet: sweet
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete sweet
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await SweetService.deleteSweet(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.json({ message: 'Sweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Purchase sweet
router.post('/:id/purchase', async (req, res) => {
  try {
    const { quantity = 1 } = req.body;
    const sweet = await SweetService.purchaseSweet(req.params.id, quantity);
    res.json({
      message: 'Purchase successful',
      sweet: sweet
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Restock sweet
router.post('/:id/restock', async (req, res) => {
  try {
    const { quantity } = req.body;
    const sweet = await SweetService.restockSweet(req.params.id, quantity);
    res.json({
      message: 'Restock successful',
      sweet: sweet
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;