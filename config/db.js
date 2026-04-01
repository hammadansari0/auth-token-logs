const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./database.sqlite');

// initialize DB
const initSQL = fs.readFileSync('./database/init.sql', 'utf-8');
db.exec(initSQL);

module.exports = db;