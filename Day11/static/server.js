// Express nu oru lightweight framework – node.js la use pandra
const express = require('express');
const app = express(); // express ku oru instance create panrom

// Port number define panrom
const PORT = 3000;

// Static files (HTML, CSS, image) serve panna,
// public folder ah static folder nu set panrom
app.use(express.static('public'));

// Root route – when user visits '/', ithu response kudukkum
app.get('/', (req, res) => {
    res.send('Vanakkam da mapla! Welcome to Express Server 😎');
});

// Another route for demo – /about path ku response kudukkum
app.get('/about', (req, res) => {
    res.send('Ithu oru about page da!');
});

// Server start pannrom
app.listen(PORT, () => {
    console.log(`Server odudhu http://localhost:${PORT} la 🔥`);
});
