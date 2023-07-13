const express = require('express');
const colors = require('colors');
const server = express();
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./db');
const routesIndex = require('./routes/routesIndex');
const configPath = path.join(__dirname, '../.env');
dotenv.config({ path: configPath });

const PORT = process.env.PORT || 5000;
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended:true }))

server.use('/api', routesIndex);

connectDB();

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.green.bold);
});
