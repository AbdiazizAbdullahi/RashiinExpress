const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

// Get route for all addresses 
router.get('/all', async(req , res) => {
  const addresses = await prisma.address.findMany()
  res.json(addresses);
});

// Get route for a specific address
router.get('/find/:id', async(req , res) => {
  const addressId = req.params.id

  const address = await prisma.address.findUnique({
    where: {
      id: addressId
    },
  })
  res.json(address)
})

// Post route for a new address
router.post('/new', async(req , res) => {
  const { country,  city, area, estate, street, house_no, customerId } = req.body

  const newAddress = await prisma.address.create({
      data: {
        country, 
        city,
        area,
        estate,
        street,
        house_no,
        customerId
      }  
    })  
  res.json(newAddress);
})

// Patch route for updating a address information
router.patch('/update/:id', async(req , res) => {
  const addressId = req.params.id
  const { country,  city, area, estate, street, house_no, customerId } = req.body

  const updateUser = await prisma.address.update({
    where: {
      id: addressId
    },
    data: {
      country, 
      city,
      area,
      estate,
      street,
      house_no,
      customerId
    } 
  })
  res.json(updateUser);
  
})

// Delete route for deleting a address
router.delete('/delete/:id', async(req, res) => {
  const addressId = req.params.id;

  const deleteUser = await prisma.address.delete({
    where: {
      id: addressId
    }
  })
  res.json({"Message" : "Address deleted successfully"})
})

module.exports = router;