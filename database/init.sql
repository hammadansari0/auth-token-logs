CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
);

CREATE TABLE IF NOT EXISTS blood_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT,
  email TEXT,
  phone TEXT,
  gender TEXT,
  blood_group_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(blood_group_id) REFERENCES blood_groups(id)
);

CREATE TABLE IF NOT EXISTS tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  token TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT,
  endpoint TEXT,
  method TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- default user (safe insert)
INSERT OR IGNORE INTO users (username, password) VALUES ('admin', 'admin123');

-- blood groups (safe insert)
INSERT OR IGNORE INTO blood_groups (type) VALUES 
('A+'),('B+'),('O+'),('AB+'),('A-'),('B-'),('O-'),('AB-');