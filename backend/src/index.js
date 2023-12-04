const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongo = require('./config/dbConnect');
const { ApiError } = require('./utility/ApiError');
const { errorConverter, errorHandler } = require('./api/middlewares/error.middleware');

const PORT = process.env.PORT || 8080;

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongo();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', require('../src/api/routes/index'));

app.use('*', (req, res, next) => {
    next(new ApiError(404, 'Not Found'));
});

app.use(errorConverter);

app.use((err, req, res, next) => {
    res.__custombody__ = err;
    errorHandler(err, re, res, next);
});

app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
});
