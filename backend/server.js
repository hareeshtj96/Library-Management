const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToDB = require('./database/db');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes/route');
const bookRoute = require('./routes/bookRoute');
const borrowRoute = require('./routes/borrowRoute');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users', routes);
app.use('/api/books', bookRoute);
app.use('/api/borrow', borrowRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectToDB();
})