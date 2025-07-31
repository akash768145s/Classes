const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const studentRoutes = require('./routes/students');

const app = express();

// Middleware
// 🌐 Middleware setup
app.use(cors({
    origin: 'http://localhost:5173', // ✅ only allow this Vite frontend
    credentials: true // optional: only if you're using cookies or auth tokens
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/students', studentRoutes);


// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation:`);
    console.log(`   GET    /health - Health check`);
    console.log(`   GET    /students - Get all students`);
    console.log(`   GET    /students/:id - Get single student`);
    console.log(`   POST   /students - Create new student`);
    console.log(`   PUT    /students/:id - Update student`);
    console.log(`   DELETE /students/:id - Delete student`);
    console.log(`   GET    /students/department/:department - Filter by department`);
    console.log(`   GET    /students/grade/:grade - Filter by grade`);
});
