import express from 'express'
import { Create ,List} from '../controllers/order';
const router = express.Router();
router.post('/addorder',Create)
router.get('/listorder',List)
module.exports = router;