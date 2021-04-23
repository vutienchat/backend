import Order from '../models/order'
export const Create = (req, res) => {
    const order = new Order(req.body)
    order.save((err,data) => {
        if (err) {
           return res.status(400).json({
                error: "add order failed"
            })
        }
        res.json(data)
    })
}
export const List = (req, res) => {
    Order.find((err,data) => {
        if (err) {
            return res.status(400).json({
                error: "không tìm thấy list"
            })
        }
        res.json(data)
    })
}