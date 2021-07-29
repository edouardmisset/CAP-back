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

// Get ascents by grade by style
// ascentsRouter.get('/by-grade-by-style', async (req, res) => {
//   try {
//     const firstGo = await AscentModel.numberOfAscentsFirstGoByGrade()
//     const secondGoAndMore =
//       await AscentModel.numberOfAscentsSecondGoOrMoreByGrade()
//     const topoGrades = await AscentModel.getGrades()
//     res.send({
//       x: topoGrades,
//       y: [
//         { name: 'Second Go', data: secondGoAndMore, color: '#ffdc00' },
//         { name: 'First Go', data: firstGo, color: '#2ecc40' },
//       ],
//       title: 'Number of Ascents by Grade and Style',
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).send(err)
//   }
// })

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
    res.status(200).send('Ascent successfully deleted ❌')
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

module.exports = ascentsRouter
