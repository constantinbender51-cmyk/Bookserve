// Import the Express framework
const express = require('express');
const path = require('path');
const app = express();

// Use process.env.PORT for Railway, or a default port like 3000 for local development
const PORT = process.env.PORT || 3000;

// Serve static files from the 'books' directory
// The URL path will be based on the file name. For example, 'books/book1.txt' will be accessible at http://localhost:3000/book1.txt
app.use(express.static(path.join(__dirname, 'books')));

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Serving files from the 'books' directory.");
  console.log("You can access book1.txt at /book1.txt and book2.txt at /book2.txt");
});
