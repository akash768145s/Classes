const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Vanakkam da mapla! 🚀');
});

app.listen(4500, () => {
    console.log('Server running at http://localhost:4000');
});


