const mongoose = require('mongoose');
const app = require('./app');
const connectDatabase = require('./config/database');

// Handling uncaught Exception
process.on('uncaughtException', (e) => {
    console.log("Shuting down server due to error" + e.message);
});

// config
if(process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({path: "./config/.env"});
}

// Database connection function
connectDatabase();

// starting server
const server = app.listen(process.env.PORT, () => {
    console.log("Server Listing at port " + process.env.PORT);
})

// unhandled promise rejection
process.on('unhandledError', (e) => {
    server.close( () => {
        process.exit(1);
    } )
})