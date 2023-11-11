const express = require('express');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

// Get route for all carts 
router.get('/all', async(req , res) => {
  const carts = await prisma.cart.findMany()
  res.json(carts);
});

// Get route for a specific cart
router.get('/find/:id', async(req , res) => {
  const cartId = req.params.id

  const cart = await prisma.cart.findUnique({
    where: {
      OR: [
        { id: cartId },
        { name: cartId },
        { phone: cartId}
      ]
    },
  })
  res.json(cart)
})

// Post route for a new cart
router.post('/new', async(req , res) => {
  const { products, customerId } = req.body

  const newCart = await prisma.cart.create({
      data: {
        products,
        customerId
      }
  })
  res.json(newCart);
})

// Patch route for updating a cart information
router.patch('/update/:id', async(req , res) => {
  const cartId = req.params.id
  const { name, email, password, phone, role } = req.body

  const updateUser = await prisma.cart.update({
    where: {
      id: cartId
    },
    data: {
     name,
     email,
     password,
     phone,
     role
    } 
  })
  res.json(updateUser);
  
})

// Delete route for deleting a cart
router.delete('/delete/:id', async(req, res) => {
  const cartId = req.params.id;

  const deleteUser = await prisma.cart.delete({
    where: {
      id: cartId
    }
  })
  res.json({"Message" : "Cart deleted successfully"})
})

module.exports = router;