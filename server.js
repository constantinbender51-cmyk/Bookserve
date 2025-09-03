// Import the Express framework
const express = require('express');
const path = require('path');
const app = express();

// Use process.env.PORT for Railway, or a default port like 3000 for local development
const PORT = process.env.PORT || 3000;

// Serve the 'public' directory for the main route, which contains index.html
app.use(express.static(path.join(__dirname, 'public')));

// Serve the 'books' directory for your book files.
// The order matters here; Express will first look for a matching file in 'public', then 'books'.
app.use(express.static(path.join(__dirname, 'books')));

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Serving static files from 'public' and 'books' directories.");
  console.log("Access the main page at / and books like /book1.txt");
});
