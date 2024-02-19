import express from 'express';
import {test} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', test);
//export so we can use inside the index
export default router;