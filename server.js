const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // 👈 Tells Node to resolve IPv4 addresses first

require('dotenv').config();
console.log('Loaded API Key:', process.env.CFBD_API_KEY ? 'EXISTS' : 'MISSING');
const express = require('express');
const path = require('path');
const scheduleController = require('./src/controllers/scheduleController');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// MVC Route
app.get('/', scheduleController.renderDashboard);

app.get('/test-cfbd', async (req, res) => {
  try {
    const axios = require('axios');
    const response = await axios.get('https://api.collegefootballdata.com/games?year=2025&team=BYU', {
      headers: { Authorization: `Bearer ${process.env.CFBD_API_KEY}` }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: err.response?.status,
      error: err.response?.data || err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`CougarStats MVC Server running on http://localhost:${PORT}`);
});