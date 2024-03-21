const express = require('express');
const cors = require('cors'); // Import cors middleware
const bodyParser = require('body-parser');

const app = express();

app.use(cors()); // Enable CORS

app.use(bodyParser.json());

// Root endpoint
app.get('/', function(req, res) {
    res.send('Hello World!');
});

// Start the server
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});