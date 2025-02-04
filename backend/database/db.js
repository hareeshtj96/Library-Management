const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGO_URI;
// connect to MongoDB
const connectToDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Database connected')
    } catch (error) {
        console.error('Error connecting to the databse:', error);
    }
}

module.exports = connectToDB;