const db = require('../config/db');

let clients = [];

function sendLogToClients(log) {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(log)}\n\n`);
  });
}

function auth(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).send('Token required');

  db.get(`SELECT * FROM tokens WHERE token=?`, [token], (err, row) => {
    if (!row) return res.status(403).send('Invalid token');

    req.user_id = row.user_id;

    const log = {
      token,
      endpoint: req.url,
      method: req.method,
      time: new Date().toISOString()
    };

    db.run(
      `INSERT INTO logs(token, endpoint, method) VALUES (?, ?, ?)`,
      [token, req.url, req.method]
    );

    // 🔥 send to all connected clients
    sendLogToClients(log);

    next();
  });
}

module.exports = { auth, clients };