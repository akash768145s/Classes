const express = require('express');
const app = express();

// JSON data understand panna middleware (built-in)
app.use(express.json());

// =========================
// 🛡️ 1. Simple Middleware
// =========================
app.use((req, res, next) => {
    console.log('🚨 Middleware: Server-la oru request vandirukku!');
    next(); // Continue to next step
});

// =========================
// ✅ 2. Normal Route
// =========================
app.get('/', (req, res) => {
    res.send('Vanakkam da mapla! 🙏 This is Home Page');
});

// =========================
// 🔐 3. Secret Route with Middleware Check
// =========================

// Route-level middleware (oru function tha)
function checkSecret(req, res, next) {
    const key = req.query.key; // URL-la ?key=1234
    if (key === '1234') {
        console.log('✅ Secret key correct');
        next(); // Continue
    } else {
        console.log('❌ Wrong secret key');
        res.status(403).send('Access Denied - Secret Key Wrong 😒');
    }
}

app.get('/secret', checkSecret, (req, res) => {
    res.send('🤫 Secret Page Open agiduchu da!');
});

// =========================
// 🚀 Server Start
// =========================
app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});
