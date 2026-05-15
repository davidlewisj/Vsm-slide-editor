const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = 'data.json';

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


// Load data from file or initialize
function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return { slides: [] };
}

// Save data to file
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get current data
app.get('/api/data', (req, res) => {
  res.json(loadData());
});

// Save new data
app.post('/api/data', (req, res) => {
  const data = req.body;
  saveData(data);
  res.json({ status: 'success' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
