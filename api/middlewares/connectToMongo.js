require('dotenv').config();
const mongoose = require('mongoose');

exports.connectToMongoDB = () => {
    const DATABASE_URL =
        process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/petStoreDB';

    mongoose.connect(DATABASE_URL);
    const db = mongoose.connection;

    db.on('error', (error) => {
        console.error(error);
    });

    db.once('open', () => {
        console.log('Database Connection Established');
    });
};
