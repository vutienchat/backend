import Product from "../models/product";
import formidable from "formidable";
import fs from "fs";
import _ from "lodash";
export const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "thêm sản phẩm thất bại",
      });
    }
    const { name, description, old_price } = fields;
    if (!name || !description || !old_price) {
      return res.status(400).json({
        error: "bạn phải nhập hết dữ liệu",
      });
    }
    let product = new Product(fields);
    if (files.photo) {
      // console.log(files.photo.size)
      if (files.photo.size > 900000) {
        return res.status(400).json({
          error: "bạn chỉ có thể up ảnh dưới 1 mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    // console.log(product);
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "add product failed",
        });
      }
      res.json(data);
    });
  });
};
export const listProduct = (req, res) => {
  const price_gte = req.query.price_gte ? { $gte: req.query.price_gte } : "";
  const price_lte = req.query.price_lte ? { $lte: req.query.price_lte } : "";
  const _sort = req.query._sort ? req.query._sort : "";
  const _order = req.query._order ? req.query._order : "";
  const _limit = req.query._limit ? { limit: parseInt(req.query._limit) } : {};
  const _page = req.query._page ? parseInt(req.query._page) : 0;
  const result =
    price_gte || price_lte ? { new_price: { ...price_gte, ...price_lte } } : {};
  const myCustomLabels = {
    totalDocs: "itemCount",
    docs: "itemsList",
    limit: "_limit",
    page: "currentPage",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pageCount",
  };
  const options = {
    select: "-photo",
    page: _page,
    ..._limit,
    sort: _sort ? { [_sort]: _order } : {},
    customLabels: myCustomLabels,
  };
  Product.paginate(result, options, (err, data) => {
    if (err) {
      res.status(400).json({
        error: "k lay dc list product",
      });
    }
    res.json(data);
  });
  // const price_gte = req.query.price_gte ? { $gte: req.query.price_gte } : '';
  // const price_lte = req.query.price_lte ? { $lte: req.query.price_lte } : '';
  // const _sort = req.query._sort ? req.query._sort : '';
  // const _order = req.query._order ? req.query._order : '';
  // const _limit = req.query._limit ? parseInt(req.query._limit) : 0;
  // const _page = req.query._page ? parseInt(req.query._page) : 0;
  // const result = price_gte || price_lte ? { new_price: { ...price_gte, ...price_lte } } : {}
  // Product.find(result)
  //     .select("-photo")
  //     .populate('category')
  //     .sort(_sort ? { [_sort]: _order } : '')
  //     .limit(_limit)
  //     .skip((_page - 1) * _limit)
  //     .exec((err, data) => {
  //         Product.countDocuments({}, (err, count) => {
  //             if (err) {
  //                 res.status(400).json({
  //                     error: 'k lay dc list product'
  //                 })
  //             }
  //             res.json({ data, pagination: { _limit, _page: parseInt(req.query._page), _totalRows: count } });
  //         })

  //     })
};
export const productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        res.status(400).json({
          error: "không thấy thông tin sản phẩm",
        });
      }
      req.product = product;
      next();
    });
};
export const read = (req, res) => {
  const data = req.product;
  return res.json(data);
};
export const remove = (req, res) => {
  const product = req.product;
  product.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        message: "không xóa được sản phẩm",
        // data
      });
    }
    res.json(data);
  });
};
export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Sửa sản phẩm thành công",
      });
    }
    const { name, description, old_price } = fields;
    if (!name || !description || !old_price) {
      return res.status(400).json({
        error: "bạn phải nhập hết dữ liệu",
      });
    }
    //    let product = new Product(fields);
    let product = req.product;
    product = _.assignIn(product, fields);
    if (files.photo) {
      if (files.photo.size > 900000) {
        return res.status(400).json({
          error: "bạn chỉ có thể up ảnh dưới 1 mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Không sửa được sản phẩm",
        });
      }
      res.json(data);
    });
  });
};
export const photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
export const listCategories = (req, res) => {
  const categoryId = req.query.categoryId ? req.query.categoryId : "";
  const price_gte = req.query.price_gte ? { $gte: req.query.price_gte } : "";
  const price_lte = req.query.price_lte ? { $lte: req.query.price_lte } : "";
  let _sort = req.query._sort;
  let _order = req.query._order;
  // Product.distinct("category", {}, (err, data) => {
  const result =
    price_gte || price_lte ? { new_price: { ...price_gte, ...price_lte } } : {};
  Product.find({ category: categoryId, ...result })
    .select("-photo")
    .sort([[_sort, _order]])
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(data);
    });
};
export const countListCategories = (req, res) => {
  const categoryId = req.query.categoryId ? req.query.categoryId : "";
  Product.find({ category: categoryId })
    .count()
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: "k tìm đc sản phẩm theo danh mục",
        });
      }
      res.json(data);
    });
};
export const listBySearch = () => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? +req.query.limit : 6;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte - greater than price [0 - 10]
        // lte - nhỏ hơn
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
};
export const listRelated = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 5;
  Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
  }) // $ne: not include
    .limit(limit)
    .select("-photo")
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};
export const getByKey = (req, res) => {
  // const category = req.query.category ? {category : req.query.category} :'';
  // const classify = req.query.classify ? req.query.classify :'';
  Product.find(req.query)
    .select("-photo")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: `không có classify 1`,
        });
      }
      res.json(data);
    });
};
export const totalProductByCategory = (req, res) => {
  Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: `total By Category not found`,
      });
    }
    res.json(data);
  });
};
