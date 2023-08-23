import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();
//user CRUD Content

//create User
router.post('/', async (req, res) => {
  const { email, name, username } = req.body
  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username
      }
    })
    res.json(result).status(201)
  } catch (e) {
    res.status(400).json({ error: "username or email should be unique" })
  }
})

//list of users
router.get('/', async (req, res) => {
  const allUsers = await prisma.user.findMany(
    //{
    //   select: {
    //     id: true,
    //     name: true,
    //     image: true,
    //     bio: true
    //   }
    // }
  )
  res.json(allUsers)
})

//get one user
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { tweets: true }
  }
  )
  res.json(user)
})

//update user
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { bio, name, image } = req.body
  try {
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        bio,
        name,
        image
      }
    })
    res.json(result)
  } catch (e) {
    res.status(400).json({ error: "Failed to update user" })
  }
})

//delete user
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  prisma.user.delete({ where: { id: Number(id) } })

  res.status(200)
})

export default router;
