import express from 'express';
const router = express.Router();
router.get('/products',(req, res) => {
    res.json({
        message: 'successfully',
    })
});
router.get('/products/:id',(req, res) => {
    res.json({
        id: req.params.id,
        name: 'products1'
    })
});
router.post('/products',(req, res) => {
    console.log(req.body)
});
module.exports = router;