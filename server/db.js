const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const colors = require('colors');
dotenv.config({ path: '../.env' });

const getIp = async () => {
    const res = await axios.get('https://api.ipify.org?format=json');
    console.log(`IP: ${res.data.ip}`.yellow);
}

const connectDB = async () => {
    try {
        await getIp();
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`.cyan);
    } catch (error) {
        console.log(`Error: ${error.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;