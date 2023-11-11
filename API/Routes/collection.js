const express = require('express');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

// Get route for all collections 
router.get('/all', async(req , res) => {
  const collections = await prisma.collection.findMany()
  res.json(collections);
});

// Get route for a specific collection
router.get('/find/:id', async(req , res) => {
  const collectionId = req.params.id

  const collection = await prisma.collection.findFirst({
    where: {
      OR: [
        { id: collectionId },
        { name: collectionId }
      ]
    },
  })
  res.json(collection)
})

// Post route for a new collection
router.post('/new', async(req , res) => {
  const { name, product, customerId } = req.body

  const newCollection = await prisma.collection.create({
      data: {
        name,
        product,
        customerId
      }
  })
  res.json(newCollection);
})

// Patch route for updating a collection information
router.patch('/update/:id', async(req , res) => {
  const collectionId = req.params.id
  const { name, product, customerId } = req.body

  const updateUser = await prisma.collection.update({
    where: {
      id: collectionId
    },
    data: {
      name,
      product,
      customerId
    }
  })
  res.json(updateUser);
  
})

// Delete route for deleting a collection
router.delete('/delete/:id', async(req, res) => {
  const collectionId = req.params.id;

  const deleteUser = await prisma.collection.delete({
    where: {
      id: collectionId
    }
  })
  res.json({"Message" : "Collection deleted successfully"})
})

module.exports = router;