const db = require('../config/db');

exports.getLogs = (req, res) => {
  db.all(`SELECT * FROM logs`, [], (err, rows) => {
    res.json(rows);
  });
};

exports.getSchema = (req, res) => {
  const tablesQuery = `
    SELECT name FROM sqlite_master
    WHERE type='table'
  `;

  db.all(tablesQuery, [], (err, tables) => {
    const result = {};

    let pending = tables.length;

    tables.forEach(t => {
      db.all(`PRAGMA table_info(${t.name})`, [], (err, cols) => {
        result[t.name] = cols;

        pending--;
        if (pending === 0) {
          res.json(result);
        }
      });
    });
  });
};

exports.getAllData = (req, res) => {
  const tablesQuery = `
    SELECT name FROM sqlite_master
    WHERE type='table'
  `;

  db.all(tablesQuery, [], (err, tables) => {
    const result = {};
    let pending = tables.length;

    tables.forEach(t => {
      db.all(`SELECT * FROM ${t.name}`, [], (err, rows) => {
        result[t.name] = rows;

        pending--;
        if (pending === 0) {
          res.json(result);
        }
      });
    });
  });
};