const express = require('express');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'books' directory
app.use(express.static(path.join(__dirname, 'books')));

// New API endpoint to get the first line of a book file
app.get('/api/title', async (req, res) => {
    const bookName = req.query.name;
    if (!bookName) {
        return res.status(400).send('Book name is required.');
    }

    const filePath = path.join(__dirname, 'books', `${bookName}.txt`);

    // Ensure the file exists and is in the correct directory
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Book not found.');
    }

    try {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        // Read only the first line
        for await (const line of rl) {
            rl.close();
            fileStream.destroy();
            return res.send(line);
        }
    } catch (error) {
        console.error('Error reading book file:', error);
        res.status(500).send('Server error.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
