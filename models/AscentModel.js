const prisma = require('../db')

// Create a new ascent
const create = async ({ date, numberOfTries, ...rest }) =>
  prisma.ascent.create({
    data: {
      date: new Date(date),
      numberOfTries: parseInt(numberOfTries, 10),
      ...rest,
    },
  })

// Create many new ascents
const createMany = async (ascents) =>
  prisma.ascent.createMany({
    data: ascents.map((ascent) => ({
      routeName: ascent.routeName,
      topoGrade: ascent.topoGrade,
      crag: ascent.crag,
      climber: ascent.climber,
      routeOrBoulder: ascent.routeOrBoulder,
      date: new Date(ascent.date),
      numberOfTries: parseInt(ascent.numberOfTries, 10),
    })),
  })

// Returns all the ascents from the DB
const findAll = async () => prisma.ascent.findMany({})

// Returns all the ascents from the DB
const findAllFromUserId = async (userId) =>
  prisma.ascent.findMany({
    where: {
      userId: parseInt(userId, 10),
    },
  })

// Delete an ascent
const destroy = async (ascentId) =>
  prisma.ascent.delete({
    where: {
      id: parseInt(ascentId, 10),
    },
  })

// Update an ascent
const update = async (
  { routeName, crag, numberOfTries, climber, date, routeOrBoulder, topoGrade },
  ascentId
) =>
  prisma.ascent.update({
    where: { id: parseInt(ascentId, 10) },
    data: {
      routeName,
      topoGrade,
      crag,
      climber,
      routeOrBoulder,
      date: new Date(date),
      numberOfTries: parseInt(numberOfTries, 10),
    },
  })

module.exports = {
  create,
  createMany,
  findAll,
  findAllFromUserId,
  destroy,
  update,
}
