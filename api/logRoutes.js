const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { clients } = require('../middleware/auth');
const { getSchema, getLogs, getAllData } = require('../controllers/logController');

router.get('/logs', getLogs);
router.get('/schema', getSchema);
router.get('/logs/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write('retry: 1000\n\n');

    clients.push(res);

    req.on('close', () => {
        const index = clients.indexOf(res);
        clients.splice(index, 1);
    });
});
router.get('/data', getAllData);

module.exports = router;