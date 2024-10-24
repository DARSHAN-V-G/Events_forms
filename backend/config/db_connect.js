const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: 'localhost',
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

module.exports = pool;