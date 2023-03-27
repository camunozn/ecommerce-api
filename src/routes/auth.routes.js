const { Router } = require('express');
const { userLogin } = require('../controllers/auth.controller');
const { authValidator } = require('../validators/auth.validators');

const router = Router();

router.post('/api/v1/auth/login', authValidator, userLogin);

module.exports = router;
