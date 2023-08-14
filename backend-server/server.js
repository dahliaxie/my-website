const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon'); // Add this line
const path = require('path'); // Add this line

const app = express();

app.use(cors());

// Serve the favicon.ico file
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

const PORT = process.env.PORT || 5000;

// Define a route to handle visitor count
let visitorCount = 0;
app.get('/api/visitor-count', (req, res) => {
  visitorCount++;
  res.json({ count: visitorCount });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
