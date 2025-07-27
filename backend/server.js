const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./src/routes/auth');
const sweetRoutes = require('./src/routes/sweets');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

// Serve static files from React build for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Sweet Shop API Server running on port ${PORT}`);
  });
}

module.exports = app;