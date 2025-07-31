const mongoose = require('mongoose');

// MongoDB Connection
const connectDB = async () => {
    try {
        // Replace 'YOUR_MONGODB_ATLAS_URL' with your actual MongoDB Atlas connection string
        const conn = await mongoose.connect('mongodb+srv://avengerspidy476:NlIFDrcVl0lzBPTy@demo.t6fx0d8.mongodb.net/studentdb?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✅ Connected to MongoDB Atlas');
        console.log(`📊 Database: ${conn.connection.name}`);
        console.log(`🌐 Host: ${conn.connection.host}`);

        return conn;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;