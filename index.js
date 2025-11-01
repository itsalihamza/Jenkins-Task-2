const express = require('express');
const { cToF } = require('./lib/converter');

const app = express();
app.get('/', (req, res) => {
  res.send('NodeApp-CI-Extended — Celsius to Fahrenheit converter. Use /convert?c=VALUE');
});

app.get('/convert', (req, res) => {
  const c = parseFloat(req.query.c);
  if (Number.isNaN(c)) {
    return res.status(400).json({ error: 'query param c is required and must be a number' });
  }
  return res.json({ c, f: cToF(c) });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server started on port ${port}`));
}

module.exports = app;
