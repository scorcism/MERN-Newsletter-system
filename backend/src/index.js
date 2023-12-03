const express = require('express')
const cors = require("cors")
const dotenv = require("dotenv");
const connectToMongo = require('./config/dbConnect');

const PORT = process.ev.PORT || 8080;

dotenv.config();
const app = express()


app.use(cors());
app.use(express.json());

connectToMongo();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/api/", require('../src/api/routes/index'));

app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`)
})