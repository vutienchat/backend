import express from 'express';

const router = express.Router();
import {ContactById, Create, List, Remove} from '../controllers/contact'
router.post('/contact',Create)
router.get('/contacts',List)
router.delete('/contact/:contactId',Remove)
router.param('contactId',ContactById)
module.exports = router;