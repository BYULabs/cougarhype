require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CFBD API Client setup
const cfbdClient = axios.create({
  baseURL: 'https://api.collegefootballdata.com',
  headers: {
    Authorization: `Bearer ${process.env.CFBD_API_KEY}`,
  },
});

// Simple test route
app.get('/', (req, res) => {
  res.send({ status: 'Server is running!' });
});

// Test endpoint fetching FBS teams
app.get('/api/teams', async (req, res) => {
  try {
    const response = await cfbdClient.get('/teams/fbs');
    res.json(response.data);
  } catch (error) {
    console.error('CFBD API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from CFBD' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});