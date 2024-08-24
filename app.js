// 

const express = require('express');
const bodyParser = require('body-parser');

const signup = require('./routes/signup');
const service = require('./routes/service');

const app = express();
app.use(bodyParser.json());

// Use the routes
app.use('/api/signup', signup);
app.use('/api/service-requests', service);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
