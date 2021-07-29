const ascentsRouter = require('express').Router()
const AscentModel = require('../models/AscentModel')

// Get all ascents
ascentsRouter.get('/', async (req, res) => {
  try {
    res.send(await AscentModel.findAll())
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

// Post new ascent(s)
ascentsRouter.post('/', async (req, res) => {
  const ascents = req.body
  try {
    await AscentModel.createMany(ascents)
    res.status(200).send('Congrats 🎉')
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

// Delete an ascent
ascentsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await AscentModel.destroy(id)
    res.status(200).send('Ascent deleted ❌')
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

ascentsRouter.patch('/:id', async (req, res) => {
  const ascent = req.body
  const { id } = req.params
  try {
    await AscentModel.update(ascent, id)
    res.status(200).send('Ascent updated 📋')
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

module.exports = ascentsRouter
