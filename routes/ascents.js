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
    const firstGo = await AscentModel.findFirstGo()
    console.log(firstGo)
const secondGoAndMore = await AscentModel.findSecondGoAndMore()
    res.send({firstGo, secondGoAndMore})
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

// Post a new ascent
ascentsRouter.post('/', async (req, res) => {
  const {
    routeName,
    topoGrade,
    date,
    crag,
    climber,
    routeOrBoulder,
    numberOfTries,
  } = req.body
  try {
    const ascent = await AscentModel.create({
      routeName,
      topoGrade,
      date: new Date(date),
      crag,
      climber,
      routeOrBoulder,
      numberOfTries,
    })
    res.status(200).send(ascent)
  } catch (err) {
    console.err(err)
    res.status(500).send(err)
  }
})

module.exports = ascentsRouter
