'use strict';

const express = require('express');
const app = express();

// Define routes
app.get('/health', (req, res) => {
  res.json({ message: 'OK' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
