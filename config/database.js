const mongoose = require('mongoose');

const connectDatabase = async() => {
    try{
        mongoose.connect(process.env.DB_URL)
        console.log("Database Connected");
    }catch{console.log("Error Connecting Database")}
}

module.exports = connectDatabase;