import { Router } from 'express'

const router = Router()

router.get('/hello', async (_, res) => {
  res.json({ message: 'world' })
})

export default router
