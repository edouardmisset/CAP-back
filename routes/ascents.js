const ascentsRouter = require('express').Router()

ascentsRouter.post('/', async (req, res) => {
  const payload = req.body
  try {
    console.log(payload)
    res.status(200).send(`hi`)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

module.exports = ascentsRouter
