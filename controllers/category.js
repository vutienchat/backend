import Category from '../models/category'
import formidable from 'formidable';
export const create = (req, res) => {
   const category = new Category(req.body);
   category.save((err,data) => {
    if(err){
        return res.status(400).json( {
            error: "thêm danh mục thất bại"
        })
    }
    res.json(data)
   });
}
export const List = (req, res) => {
    Category.find((err,data) => {
       if(err){
        return res.status(400).json({
            error: "Không tồn tại dah mục"
        })
       }
       res.json(data)
    })
}
export const categoryById = (req, res ,next , id) => {
    Category.findById(id).exec((err, category) => {
      if(err || !category){
         res.status(400).json({
             error: 'không thấy thông tin Danh Mục'
         })
       }
       req.category = category;
       next();
    })
}
export const read = (req, res) => {
    return res.json(req.category)
}
export const Update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err,data) =>{
        if(err){
            res.status(400).json({
                error: "Sửa danh mục thất bại"
            })
        }
        res.json(data)
    });
}
export const Remove = (req, res) =>{
    const category = req.category;
    category.remove((err,data) => {
         if(err){
             res.status(400).json({
                 error: "Xóa danh mục thất bại"
             })
         }
         res.json(data)
    })
}