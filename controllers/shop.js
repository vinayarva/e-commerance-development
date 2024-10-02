const Product = require('../models/product');
const Cart = require('../models/cart');

// Fetch all products
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

// Fetch single product by ID
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

// Fetch products for homepage (index)
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

// Fetch cart items
exports.getCart = (req, res, next) => {
  Cart.findAll({ include: ['product'] }) // Assuming cart has a relation with products
    .then(cart => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cart.products
      });
    })
    .catch(err => console.log(err));
};

// Add product to cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId)
    .then(product => {
      return Cart.addProduct(prodId, product.price); // Assuming Cart model has an addProduct method
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

// Delete product from cart
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId)
    .then(product => {
      return Cart.deleteProduct(prodId, product.price); // Assuming Cart model has deleteProduct method
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

// Fetch orders
exports.getOrders = (req, res, next) => {
  // Assuming you have an Order model in Sequelize
  req.user
    .getOrders({ include: ['products'] })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

// Checkout process
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
