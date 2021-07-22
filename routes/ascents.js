const ascentsRouter = require('express').Router()
const AscentModel = require('../models/AscentModel')

// Get all ascents
ascentsRouter.get('/', async (req, res) => {
  try {
    const allAscents = await AscentModel.findAll()
    res.send(allAscents)
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

// Get ascents by grade by style
ascentsRouter.get('/by-grade-by-style', async (req, res) => {
  try {
    const firstGo = await AscentModel.numberOfAscentsFirstGoByGrade()
    const secondGoAndMore =
      await AscentModel.numberOfAscentsSecondGoOrMoreByGrade()
    const topoGrades = await AscentModel.getGrades()
    res.send({
      x: topoGrades,
      y: [
        { name: 'Second Go', data: secondGoAndMore, color: '#ffdc00' },
        { name: 'First Go', data: firstGo, color: '#2ecc40' },
      ],
      title: 'Number of Ascents by Grade and Style',
    })
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

// Post a new ascent
ascentsRouter.post('/', async (req, res) => {
  const ascents = req.body
  console.log(ascents)
  try {
    const result = await AscentModel.createMany(ascents)
    console.log(result)
    res.status(200).send('Congrats 🎉')
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

module.exports = ascentsRouter
