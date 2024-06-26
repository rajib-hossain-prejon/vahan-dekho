import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  })
})


// @desc    Fetch all products
// @route   GET /api/products/filterByColor
// @access  Public
const getProductsByColor = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1


  const keyword = req.query.color
    ? {
        color: {
          $regex: req.query.color,
          $options: "i",
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  })
})
// @desc    Fetch all products
// @route   GET /api/products/filterByCategory
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1


  const keyword = req.query.category
    ? {
        category: {
          $regex: req.query.category,
          $options: "i",
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  })
})


// @desc    Fetch all products within Price Range
// @route   GET /api/products/filterByPrice
// @access  Public
const getProductsByPrice = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const minPrice = req.query.minPrice ? parseInt(req.query.minPrice, 10) : 0;
  // const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice, 10) : Number.MAX_SAFE_INTEGER;

  const count = await Product.countDocuments({
    minPrice: { $gte: minPrice },
  });

  

  const products = await Product.find({
    minPrice: { $gte: minPrice},
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));



  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// const getProducts = asyncHandler(async (req, res) => {
//   const pageSize = 10;
//   const page = Number(req.query.pageNumber) || 1;
//   const { keyword, color, category, minPrice, maxPrice } = req.query;

//   const query = {};
//   console.log('COlor: ',color)
//   console.log('keyword: ',keyword)
//   console.log('category: ',color)
  

//   if (keyword) {
//     query.name = { $regex: keyword, $options: 'i' };
//   }

//   if (color) {
//     query.color = color;
//   }

//   if (category) {
//     query.category = category;
//   }

//   if (minPrice && maxPrice) {
//     query.priceRange = {
//       $gte: parseInt(minPrice, 10),
//       $lte: parseInt(maxPrice, 10)
//     };
//   }

//   const count = await Product.countDocuments(query);
//   const products = await Product.find(query)
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));

//   res.json({
//     products,
//     page,
//     pages: Math.ceil(count / pageSize),
//   });
// });

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin


const createProduct = asyncHandler(async (req, res) => {
  // Destructure relevant fields from req.body
  let {
    name,
    price,
    description,
    image,
    brand,
    category,
    color,
    minPrice,
    maxPrice,
    countInStock,
    features,
    latestUpdates,
  } = req.body;

  const userId = req.user._id;
  const priceRange = {
    minPrice: parseInt(minPrice,10),
    maxPrice: parseInt(maxPrice,10)
  }

 



  // Create a new Product instance with data from req.body
  const product = new Product({
    name,
    price,
    user: userId, // Assuming user data is accessible in req.user
    image,
    brand,
    category,
    color,
   priceRange,
    countInStock,
    numReviews: 0, // Initialize numReviews to 0 for a new product
    description,
features,
latestUpdates,
  });

  // Save the product to the database
  const createdProduct = await product.save();
  console.log(createdProduct);
  // Send a success response with the created product data
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Product already reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  createProduct, createProductReview, deleteProduct, getProductById, getProducts, getProductsByCategory, getProductsByColor, getProductsByPrice, getTopProducts, updateProduct
};

