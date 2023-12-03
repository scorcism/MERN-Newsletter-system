const mongoose = require('mongoose')


const connectToMongo = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("Connected to db")
        })
        .catch((error) => {
            console.log("ERROR!!!!!: ", error)
        })
}
module.exports = connectToMongo;