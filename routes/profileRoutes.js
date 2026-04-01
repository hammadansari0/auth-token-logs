const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const ctrl = require('../controllers/profileController');

router.get('/profile', auth, ctrl.getProfile);
router.post('/profile', auth, ctrl.createProfile);
router.put('/profile', auth, ctrl.updateProfile);
router.patch('/profile', auth, ctrl.patchProfile);
router.delete('/profile', auth, ctrl.deleteProfile);

module.exports = router;