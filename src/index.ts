'use strict';

import express from 'express';
import { HealthRoute } from './types';

const app = express();

// Define routes
app.get('/health', (req, res) => {
  res.json( { message: 'OK' } as HealthRoute );
});

// Start the server
app.listen(3010, () => {
  console.log('Server started on port 3010');
});
