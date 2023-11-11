const express = require('express');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

// GET route for all users
router.get('/all', async(req , res) => {
  const users = await prisma.user.findMany({
    include : {cart : true}
  })
  res.json(users)
});

// Get route to find a specific user
router.get('/find/:id', async(req , res) => {
  const userId = req.params.id

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { id: userId },
        { name: userId },
        { phone: userId}
      ]
    },
  })
  res.json(user)
})

// Post route for creating a new user
router.post('/new', async(req , res) => {
  const { name, email, password, phone, role } = req.body

  const newUser = await prisma.user.create({
      data: {
          name,
          email,
          password,
          phone,
          role,
      }
  })
  res.json(newUser);
})

// Patch route for updating a user information
router.patch('/update/:id', async(req , res) => {
  const userId = req.params.id
  const { name, email, password, phone, role } = req.body

  const updateUser = await prisma.user.update({
    where: {
      id: userId
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

// Patch route for searching a specific user
// router.get('/search/:word', async(req, res) => {
//   const user = req.params.word
  
//   const searchUser = await prisma.user.findMany({
//     where: {
//       name
//     }
//   })
// })


// Delete route for deleting a user
router.delete('/delete/:id', async(req, res) => {
  const userId = req.params.id;

  const deleteUser = await prisma.user.delete({
    where: {
      id: userId
    }
  })
  res.json({"Message" : "User deleted successfully"})
})

module.exports = router;
/*


// Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get a specific user by ID
router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Create a new user
router.post("/new", async (req, res) => {
  const { name, password } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        password,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new user" });
  }
});

// Update a user's details by ID
router.put("/update/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const { name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete a user by ID
router.delete("/delete/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

*/
