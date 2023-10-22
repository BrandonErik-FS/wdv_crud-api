require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { connectToMongoDB } = require('./middlewares/connectToMongo');
const petsRouter = require('./routes/petsRouter');
const authRouter = require('./routes/authRouter');

const PORT = process.env.PORT || 3000;

connectToMongoDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../reactjs/dist')));

app.use('/api/v1/pets', petsRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../reactjs/dist', 'index.html'));
});

app.all('/*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
