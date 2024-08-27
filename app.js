// 

const express = require('express');
const bodyParser = require('body-parser');


const service = require('./service');

const app = express();
app.use(bodyParser.json());

// Use the routes

app.use('/api/service-requests', service);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
