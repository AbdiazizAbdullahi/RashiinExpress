const express = require('express');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

// Get route for all orders 
router.get('/all', async(req , res) => {
  const orders = await prisma.order.findMany()
  res.json(orders);
});

// Get route for a specific order
router.get('/find/:id', async(req , res) => {
  const orderId = req.params.id

  const order = await prisma.order.findUnique({
    where: {
      OR: [
        { id: orderId },
        { name: orderId },
        { phone: orderId}
      ]
    },
  })
  res.json(order)
})

// Post route for a new order
router.post('/new', async(req , res) => {
  const { status, paid, comment, products, customerId } = req.body

  const newOrder = await prisma.order.create({
      data: {
        status,
        paid,
        comment,
        products,
        customerId
      }
  })
  res.json(newOrder);
})

// Patch route for updating a order information
router.patch('/update/:id', async(req , res) => {
  const orderId = req.params.id
  const { status, paid, comment, products, customerId } = req.body

  const updateOrder = await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status,
      paid,
      comment,
      products,
      customerId
    } 
  })
  res.json(updateOrder);
  
})

// Delete route for deleting a order
router.delete('/delete/:id', async(req, res) => {
  const orderId = req.params.id;

  const deleteOrder = await prisma.order.delete({
    where: {
      id: orderId
    }
  })
  res.json({"Message" : "Order deleted successfully"})
})

module.exports = router;