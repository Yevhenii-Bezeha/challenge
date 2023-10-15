const express = require('express');
const { priceOffers } = require('./data/mock');
const app = express();
const port = 4200;

app.get('/price-offers', (req, res) => {
  res.json(priceOffers);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
