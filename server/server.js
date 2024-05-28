const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const port = 8002;

// Add CORS middleware
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
