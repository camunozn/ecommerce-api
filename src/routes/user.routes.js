const { Router } = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validators');
const userValidator = require('../validators/user.validators');

const router = Router();

router.post('/signup', authValidator.singUp, authController.signUp);
router.post('/login', authValidator.login, authController.login);

router.put('/:id', authController.protect, userController.updateUser);

router.get('/', userController.getAllUsers);

module.exports = router;
