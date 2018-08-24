import express from 'express';
import * as controller from 'controllers/auth';
import * as validators from 'validators/auth';

const router = express.Router();

router.post('/login', validators.login, controller.login);
router.post('/register', validators.register, controller.register);

module.exports = router;
