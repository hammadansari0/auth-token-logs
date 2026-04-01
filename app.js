const express = require('express');
const app = express();

require('./config/db');
app.use(express.static('public'));
app.use(express.json());

app.use('/', require('./api/authRoutes'));
app.use('/', require('./api/profileRoutes'));
app.use('/', require('./api/logRoutes'));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});