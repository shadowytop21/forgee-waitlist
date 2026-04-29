require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const subscribeHandler = require('./api/subscribe');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Mirror Vercel serverless route
app.post('/api/subscribe', (req, res) => {
  // adapt vercel-style handler
  const reqCopy = { method: req.method, body: req.body };
  subscribeHandler(reqCopy, {
    status(code) {
      this._status = code; return this;
    },
    json(obj) {
      const status = this._status || 200;
      res.status(status).json(obj);
    }
  });
});

app.listen(PORT, () => console.log(`Dev server running at http://localhost:${PORT}`));
