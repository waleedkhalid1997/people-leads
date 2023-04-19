const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const userSchema = require('../validations/usersValidation');
const { createNewLead } = require('../controllers/leadController');

// http://localhost:3000/api/v1/users/
router.post('/', createNewLead);

module.exports = router;
