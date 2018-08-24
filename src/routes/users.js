import express from 'express';
import * as controller from 'controllers/users';
import validators from 'validators/users';
import { checkIfModelExists } from './middleware';

const router = express.Router();

router.get('/me', controller.getCurrentUser);
router.put('/me', validators.updateCurrent, controller.updateCurrentUser);

router.get('/', validators.index, controller.index);
router.post('/', validators.create, controller.create);
router.get('/:id', validators.show, checkIfModelExists('User'), controller.show);
router.put('/:id', validators.update, checkIfModelExists('User'), controller.update);
router.delete('/:id', validators.destroy, checkIfModelExists('User'), controller.destroy);

module.exports = router;
