
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
const SECRET_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imk2bEdrM0ZaenhSY1ViMkMzbkVRN3N5SEpsWSIsImtpZCI6Imk2bEdrM0ZaenhSY1ViMkMzbkVRN3N5SEpsWSJ9.eyJhdWQiOiJlZjFkYTlkNC1mZjc3LTRjM2UtYTAwNS04NDBjM2Y4MzA3NDUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mYTE1ZDY5Mi1lOWM3LTQ0NjAtYTc0My0yOWYyOTUyMjIyOS8iLCJpYXQiOjE1MzcyMzMxMDYsIm5iZiI6MTUzNzIzMzEwNiwiZXhwIjoxNTM3MjM3MDA2LCJhY3IiOiIxIiwiYWlvIjoiQVhRQWkvOElBQUFBRm0rRS9RVEcrZ0ZuVnhMaldkdzhLKzYxQUdyU091TU1GNmViYU1qN1hPM0libUQzZkdtck95RCtOdlp5R24yVmFUL2tES1h3NE1JaHJnR1ZxNkJuOHdMWG9UMUxrSVorRnpRVmtKUFBMUU9WNEtjWHFTbENWUERTL0RpQ0RnRTIyMlRJbU12V05hRU1hVU9Uc0lHdlRRPT0iLCJhbXIiOlsid2lhIl0sImFwcGlkIjoiNzVkYmU3N2YtMTBhMy00ZTU5LTg1ZmQtOGMxMjc1NDRmMTdjIiwiYXBwaWRhY3IiOiIwIiwiZW1haWwiOiJBYmVMaUBtaWNyb3NvZnQuY29tIiwiZmFtaWx5X25hbWUiOiJMaW5jb2xuIiwiZ2l2ZW5fbmFtZSI6IkFiZSAoTVNGVCkiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMjIyNDcvIiwiaXBhZGRyIjoiMjIyLjIyMi4yMjIuMjIiLCJuYW1lIjoiYWJlbGkiLCJvaWQiOiIwMjIyM2I2Yi1hYTFkLTQyZDQtOWVjMC0xYjJiYjkxOTQ0MzgiLCJyaCI6IkkiLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJsM19yb0lTUVUyMjJiVUxTOXlpMmswWHBxcE9pTXo1SDNaQUNvMUdlWEEiLCJ0aWQiOiJmYTE1ZDY5Mi1lOWM3LTQ0NjAtYTc0My0yOWYyOTU2ZmQ0MjkiLCJ1bmlxdWVfbmFtZSI6ImFiZWxpQG1pY3Jvc29mdC5jb20iLCJ1dGkiOiJGVnNHeFlYSTMwLVR1aWt1dVVvRkFBIiwidmVyIjoiMS4wIn0.D3H6pMUtQnoJAGq6AHd!";

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
