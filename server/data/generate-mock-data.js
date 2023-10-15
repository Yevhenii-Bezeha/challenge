const fs = require('fs');

// Unique origin and destination combinations
const uniqueOrigins = ['JFK', 'LHR', 'AMS', 'FRA', 'LAX', 'CDG'];
const uniqueDestinations = ['LAX', 'CDG', 'BCN', 'FCO', 'SFO', 'LHR'];

// Function to generate a random date within the specified range
function randomDate(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());

  return new Date(randomTime);
}

// Generate a larger dataset
const data = [];
let startDate = new Date('2023-10-01');
let endDate = new Date('2023-12-31');

for (let i = 0; i < 500; i++) {
  // Increase the number of entries to generate more data
  const origin =
    uniqueOrigins[Math.floor(Math.random() * uniqueOrigins.length)];
  const destination =
    uniqueDestinations[Math.floor(Math.random() * uniqueDestinations.length)];
  let departureDate = randomDate(startDate, endDate).toISOString().slice(0, 10);
  let returnDate = randomDate(startDate, endDate).toISOString().slice(0, 10);

  if (departureDate >= returnDate) {
    const nextDay = new Date(departureDate);

    nextDay.setDate(nextDay.getDate() + 1);
    returnDate = nextDay.toISOString().slice(0, 10);
  }

  const seatAvailability = Math.floor(Math.random() * 10) + 1;
  const priceAmount = (Math.random() * (500 - 150) + 150).toFixed(2);
  const currency = 'EUR';
  const offerType = 'BestPrice';
  const uuid = `SA${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(
    100000 + Math.random() * 900000,
  )}`;

  data.push({
    origin,
    destination,
    departureDate,
    returnDate,
    seatAvailability,
    price: {
      amount: parseFloat(priceAmount),
      currency,
    },
    offerType,
    uuid,
  });

  // Add at least 10 duplicates with different prices
  if (i < 10) {
    for (let j = 0; j < 10; j++) {
      // Increase the number of duplicates to reduce gaps in dates
      const duplicate = { ...data[i] };

      duplicate.price.amount = (
        parseFloat(duplicate.price.amount) +
        Math.random() * 20
      ).toFixed(2);
      data.push(duplicate);
    }
  }
}

// Convert the data to JSON and save it to a file
const jsonData = JSON.stringify(data, null, 2);

fs.writeFileSync('./server/data/data.json', jsonData, 'utf8');

console.log('Data generated and saved to "./server/data/data.json".');
