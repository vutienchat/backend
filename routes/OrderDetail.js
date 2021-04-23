import express from 'express'
import { Create , ListorderDetail} from '../controllers/OrderDetail';
const router = express.Router();
router.post('/addorderDetail',Create)
router.get('/listorderDetail',ListorderDetail)
module.exports = router;