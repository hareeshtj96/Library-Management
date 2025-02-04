const express = require('express');
const cors = require('cors');
const connectToDB = require('./database/db');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes/route');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectToDB();
})