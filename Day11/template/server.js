const express = require('express');
const app = express();
const PORT = 3000;

// ejs template engine set panrom
app.set('view engine', 'ejs');

// Home route – view render pannrom
app.get('/', (req, res) => {
    const user = { name: 'Akash', role: 'Student' };
    res.render('home', { user });
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
