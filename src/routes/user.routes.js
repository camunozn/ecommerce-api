const { Router } = require('express');
const { createUser, updateUser } = require('../controllers/user.controller');
const {
  createUserValidator,
  updateUserValidator,
} = require('../validators/user.validator');

const router = Router();

router.post('/api/v1/users', createUserValidator, createUser);

router.put('/api/v1/users/:id', updateUserValidator, updateUser);

module.exports = router;
