
// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Load JSON file as database
const adviceData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Middleware to parse JSON body
app.use(express.json());

// Serve html
app.use(express.static(path.join(__dirname, 'public')));

// Hardcoded secret
const SECRET_KEY = "SuperSecretTimeKey123!";

// Users with weak credentials stored in memory
let users = { 'admin': 'password123' };

// API endpoint to fetch advice with filtering
app.get('/advice', (req, res) => {
  const { year } = req.query;

  console.log(`Fetching advice for year ${year}`);
  if (year) {
    console.log(adviceData)
    const advice = adviceData[year];
    if (advice) {
      console.log("found advice")
      console.log({ year, advice })
      return res.json({ year, advice });
    } else {
      let advice;
      if (year > 2040) {
        advice = "You think the world is getting this far?"
      }
      else {
        advice = "Are you this old? Gosh, try again."
      }
      return res.status(404).json({ year, advice });
    }
  } else {
    const allAdvice = Object.entries(adviceData)
      .map(([key, value]) => ({ year: key, advice: value }));
    res.json(allAdvice);
  }
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    res.json({ message: "Login successful", token: SECRET_KEY });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// User input endpoint
app.post('/submit', (req, res) => {
  const { message } = req.body;
  if (typeof message !== 'string') {
    throw new Error("Invalid input");
  }
  res.json({ status: "Received", message });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}, Request Body: ${JSON.stringify(req.body)}`);
  res.status(500).json({ error: "Something went wrong" });
});

// Load lodash
const _ = require('lodash');

// Serve frontend for all unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
