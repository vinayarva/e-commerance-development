const Product = require('../models/product'); // Sequelize Product model

// Render Add Product Page
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

// Add Product
exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;

  // Using Sequelize to create a new product
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(() => {
      console.log('Product Created');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

// Render Edit Product Page
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  // Fetch product by primary key (id)
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

// Update Product
exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;

  // Find product by ID and update its fields
  Product.findByPk(productId)
    .then(product => {
      if (product) {
        product.title = title;
        product.price = price;
        product.imageUrl = imageUrl;
        product.description = description;
        return product.save(); // Save updated product
      } else {
        res.redirect('/admin/products');
      }
    })
    .then(() => {
      console.log('Product Updated');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

// Fetch All Products
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

// Delete Product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // Find product by ID and delete it
  Product.findByPk(prodId)
    .then(product => {
      if (product) {
        return product.destroy(); // Delete product
      }
    })
    .then(() => {
      console.log('Product Deleted');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
