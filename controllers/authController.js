const db = require('../config/db');
const { generateToken } = require('../utils/token');

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE username=? AND password=?`,
    [username, password],
    (err, user) => {
      if (!user) return res.status(401).send('Invalid credentials');

      const token = generateToken();

      db.run(
        `INSERT INTO tokens(user_id, token) VALUES (?, ?)`,
        [user.id, token]
      );

      res.json({ token });
    }
  );
};