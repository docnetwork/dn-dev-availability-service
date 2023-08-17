'use strict';
require('dotenv').config()

import express from 'express';
import { health, workload } from './routes';

const app = express();

// Define routes
app.get('/health', (req, res) => health({ req, res }) );

app.get('/workload', (req, res) => workload({ req, res }) );

// Start the server
app.listen(3010, () => {
  console.log('Server started on port 3010');
});
