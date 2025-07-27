// This Is OLD CODE 
// const express = require('express');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Basic route for testing
// app.post('/api/auth/register', (req, res) => {
//   // Minimal code to make test pass
//   const { username, password } = req.body;
    
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password required' });
//   }

//   // For now, just return success (we'll add real logic later)
//   res.status(201).json({
//     message: 'User registered successfully',
//     userId: 'temp-id-123'
//   });
// });

// const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV !== 'test') {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

// module.exports = app;

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import the route files we created
const authRoutes = require('./src/routes/auth');
const sweetRoutes = require('./src/routes/sweets');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);


// This is the new part for production
if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Handles any requests that don't match the ones above
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



// Tell the app to use our new routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

// A simple "health check" route to see if the server is running
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Sweet Shop API Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}/api/health to check if it's working`);
  });
}

module.exports = app;