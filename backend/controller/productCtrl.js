const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

// Create a product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single product
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all products with filtering and pagination - FIXED VERSION
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Build filter query
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Handle specific filters
    let filterQuery = {};

    // Category filter
    if (queryObj.category) {
      filterQuery.category = queryObj.category;
    }

    // Size filter
    if (queryObj.size) {
      filterQuery.size = queryObj.size;
    }

    // Search filter
    if (queryObj.search) {
      filterQuery.$or = [
        { title: { $regex: queryObj.search, $options: "i" } },
        { description: { $regex: queryObj.search, $options: "i" } },
      ];
    }

    // Price range filter
    if (queryObj.minPrice || queryObj.maxPrice) {
      filterQuery.price = {};
      if (queryObj.minPrice) {
        filterQuery.price.$gte = parseFloat(queryObj.minPrice);
      }
      if (queryObj.maxPrice) {
        filterQuery.price.$lte = parseFloat(queryObj.maxPrice);
      }
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Sorting
    let sort = "-createdAt"; // Default sort by newest
    if (req.query.sort) {
      sort = req.query.sort.split(",").join(" ");
    }

    // Execute query
    const products = await Product.find(filterQuery)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalProducts / limit);

    // Always return proper response structure
    res.json({
      products,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};