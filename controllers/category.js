import Category from '../models/category'
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';
export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "thêm danh mục thất bại"
            })
        }
        const { name } = fields;
        if (!name) {
            return res.status(400).json({
                error: "bạn phải nhập Tên danh mục"
            })
        }
        let category = new Category(fields);
        if (files.photo) {
            if (files.photo.size > 900000) {
                return res.status(400).json({
                    error: "bạn chỉ có thể up ảnh dưới 1 mb"
                })
            }
            category.photo.data = fs.readFileSync(files.photo.path);
            category.photo.contentType = files.photo.type;
        }
        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'add category failed'
                })
            }
            res.json(data);
        })
    })
}
export const List = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 0;
    Category.find()
        .limit(parseInt(limit))
        .skip(0)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Không tồn tại dah mục"
                })
            }
            res.json(data)
        })
}
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
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
    // const category = req.category;
    // category.name = req.body.name;
    // category.save((err, data) => {
    //     if (err) {
    //         res.status(400).json({
    //             error: "Sửa danh mục thất bại"
    //         })
    //     }
    //     res.json(data)
    // });
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Sửa danh mục thất bại"
            })
        }
        const { name } = fields;
        if (!name) {
            return res.status(400).json({
                error: "bạn phải nhập tên danh mục"
            })
        }
        let category = req.category;
        category = _.assignIn(category, fields)
        if (files.photo) {
            if (files.photo.size > 900000) {
                return res.status(400).json({
                    error: "bạn chỉ có thể up ảnh dưới 1 mb"
                })
            }
            category.photo.data = fs.readFileSync(files.photo.path);
            category.photo.contentType = files.photo.type;
        }
        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'add category failed'
                })
            }
            res.json(data);
        })
    })
}
export const Remove = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if (err) {
            res.status(400).json({
                error: "Xóa danh mục thất bại"
            })
        }
        res.json(data)
    })
}
export const photo = (req, res, next) => {
    if (req.category.photo.data) {
        res.set("Content-Type", req.category.photo.contentType);
        return res.send(req.category.photo.data);
    }
    next();
}