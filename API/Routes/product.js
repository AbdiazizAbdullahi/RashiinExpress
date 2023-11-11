const express = require('express');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

// Get route for all products
router.get('/all', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get route for a specific product
router.get('/find/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: productId },
          { name: productId },
          { category: productId }
        ]
      },
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    next(error);
  }
});

// Post route for a new product
router.post('/new', async (req, res, next) => {
  try {
    const { name, image, quantity, stock, category, cart } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        image,
        quantity,
        stock,
        category,
        cart
      }
    });
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});

// Patch route for updating a product information
router.patch('/update/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { name, image, quantity, stock, category, cart } = req.body;

    const updateProduct = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        name,
        image,
        quantity,
        stock,
        category,
        cart
      }
    });
    res.json(updateProduct);
  } catch (error) {
    next(error);
  }
});

// Delete route for deleting a product
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await prisma.product.delete({
      where: {
        id: productId
      }
    });
    if (deleteProduct) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = router;
