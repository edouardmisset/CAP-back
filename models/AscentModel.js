const prisma = require('../db')

// Create a new ascent
const create = async ({
  routeName,
  topoGrade,
  date,
  crag,
  climber,
  routeOrBoulder,
  numberOfTries,
}) =>
  prisma.ascent.create({
    data: {
      routeName,
      topoGrade,
      date,
      crag,
      climber,
      routeOrBoulder,
      numberOfTries: parseInt(numberOfTries, 10),
    },
  })

// Returns all the ascents from the DB
const findAll = async () => prisma.ascent.findMany({})

// Return a list of grades from the DB
const getGrades = async () =>
  (
    await prisma.ascent.groupBy({
      by: ['topoGrade'],
      orderBy: {
        topoGrade: 'asc',
      },
    })
  ).map(({ topoGrade }) => topoGrade)

// Return a list of the number of ascents sent second go or more by grade from the DB
const numberOfAscentsSecondGoOrMoreByGrade = async () => {
  const result = await prisma.ascent.groupBy({
    by: ['topoGrade'],
    // _count: true,
    where: {
      numberOfTries: {
        gte: 2,
      },
    },
    orderBy: {
      topoGrade: 'asc',
    },
    _count: true,
  })
  return result.map(({ topoGrade, _count }) => ({ [topoGrade]: _count }))
}

// Return a list of the number of ascents sent first go by grade from the DB
const numberOfAscentsFirstGoByGrade = async () => {
  const result = await prisma.ascent.groupBy({
    by: ['topoGrade'],
    _count: true,
    where: {
      numberOfTries: 1,
    },
    orderBy: {
      topoGrade: 'asc',
    },
  })
  return result.map(({ topoGrade, _count }) => ({ [topoGrade]: _count }))
}

module.exports = {
  create,
  findAll,
  numberOfAscentsFirstGoByGrade,
  numberOfAscentsSecondGoOrMoreByGrade,
  getGrades,
}
