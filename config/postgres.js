const { Client } = require('pg');

// Define the database URL
const DATABASE_URL = 'postgresql://grishma_joshi_user:OieTJs4HjtVsIYmI9HZl0deNdiUYVnue@dpg-cr4s70g8fa8c73a70geg-a/grishma_joshi';

// Create a new client instance
const client = new Client({
  connectionString: DATABASE_URL,
});

// Connect to the PostgreSQL server
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database.');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database', err.stack);
  });

// Export the client for use in other modules
module.exports = client;
