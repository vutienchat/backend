import OrderDetail from '../models/OrderDetail'
export const Create = (req, res) => {
    const orderDetai = new OrderDetail(req.body)
    orderDetai.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "add order detail failed"
            })
        }
        res.json(data)
    })
}
export const ListorderDetail = (req, res) => {
    OrderDetail.find({"orderId": req.query.orderId}).populate('productId').exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "list order detail failed"
            })
        }
        res.json(data)
    })
}