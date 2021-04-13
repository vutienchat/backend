import Product from '../models/product';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';
export const create = (req, res) => {
     let form = new formidable.IncomingForm();
     form.keepExtensions = true;
     form.parse(req , (err,fields,files) => {
        if (err) {
            return res.status(400).json( {
                error :  "thêm sản phẩm thành công"
            })
        }
        const {name,description,old_price} = fields;
        if(!name || !description || !old_price) {
            return res.status(400).json({
                error : "bạn phải nhập hết dữ liệu"
            })
        }
        let product = new Product(fields);
        if(files.photo){
            // console.log(files.photo.size)
           if(files.photo.size >100000){
               return res.status(400).json({
                   error : "bạn chỉ có thể up ảnh dưới 1 mb"
               })
           }
           product.photo.data = fs.readFileSync(files.photo.path);
           product.photo.contentType = files.photo.type;
        }
        // console.log(product);
            product.save((err,data) =>{
                    if(err){
                       return res.status(400).json({
                            error: 'add product failed'
                        })
                    }
                    res.json(data);
                })
     })
}
export const listProduct = (req, res) => {
    Product.find().select("-photo").populate('category').exec((err, data) => {
        // Product.find().exec((err, data) => {
        if(err){
            res.status(400).json({
                error: 'add product failed'
            })
        }
        res.json(data);
    })
    
}
export const productById = (req, res ,next , id) => {
     Product.findById(id).populate('category').exec((err, product) => {
       if(err || !product){
          res.status(400).json({
              error: 'không thấy thông tin sản phẩm'
          })
        }
        req.product = product;
        next();
     })
}
export const read = (req, res) => {
    const data = req.product;
    return res.json(data)
}
export const remove = (req, res) => {
    const product = req.product;
    product.remove((err,data) => {
        if(err){
            return res.status(400).json({
                message: 'không xóa được sản phẩm',
                // data
            })
        }
        res.json(data);
    })
}
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req , (err,fields,files) => {
       if (err) {
           return res.status(400).json( {
               error :  "Sửa sản phẩm thành công"
           })
       }
       const {name,description,old_price} = fields;
       if(!name || !description || !old_price) {
           return res.status(400).json({
               error : "bạn phải nhập hết dữ liệu"
           })
       }
    //    let product = new Product(fields);
    let product = req.product;
        product = _.assignIn(product,fields);
       if(files.photo){
          if(files.photo.size >100000){
              return res.status(400).json({
                  error : "bạn chỉ có thể up ảnh dưới 1 mb"
              })
          }
          product.photo.data = fs.readFileSync(files.photo.path);
          product.photo.contentType = files.photo.type;
       }
           product.save((err,data) =>{
                   if(err){
                       res.status(400).json({
                           error: 'Không sửa được sản phẩm'
                       })
                   }
                   res.json(data);
               })
    })
}
export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}
export const listCategories = (req, res) => {
    Product.distinct("category", {}, (err, data) => {
        if (err) {
            res.status(400).json({
                error: "Products not found"
            })
        }
        res.json(data);
    })
}
export const listRelated = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 5;
    Product.find({
        _id: { $ne: req.product },
        category: req.product.category
        
    }) // $ne: not include
        .limit(limit)
        .select('-photo')
        .populate('category', '_id name',)
        .exec((err, products) => {
            if (err) {
                res.status(400).json({
                    error: "Products not found"
                })
            }
            res.json(products)
        })
}
