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

app.use("/api/auth", require('./api/routes/v1/auth'));
app.use("/api/audience", require('./api/routes/v1/audience'));
app.use("/api/audience-type", require('./api/routes/v1/audienceType'));
app.use("/api/contact", require('./api/routes/v1/contact'));

app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`)
})