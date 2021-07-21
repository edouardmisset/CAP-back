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

// Returns all the ascents sent first go from the DB
const findFirstGo = async () =>
  prisma.ascent.findMany({
    where: { numberOfTries: 1 },
  })

// Returns all the ascents sent second go or more from the DB
const findSecondGoAndMore = async () =>
  prisma.ascent.findMany({
    where: {
      numberOfTries: {
        gt: 1,
      },
    },
  })

module.exports = { create, findAll, findFirstGo, findSecondGoAndMore }
