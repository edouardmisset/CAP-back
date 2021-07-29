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
const numberOfAscentsSecondGoOrMoreByGrade = async () =>
  (
    await prisma.$queryRaw`SELECT "topoGrade", count(CASE WHEN "numberOfTries" >= 2 THEN 1 END) from "Ascent" GROUP BY "topoGrade" ORDER BY "topoGrade" ASC`
  ).map(({ topoGrade, count }) => [topoGrade, count])

// Return a list of the number of ascents sent first go by grade from the DB
const numberOfAscentsFirstGoByGrade = async () =>
  (
    await prisma.$queryRaw`SELECT "topoGrade", count(CASE WHEN "numberOfTries" = 1 THEN 1 END) from "Ascent" GROUP BY "topoGrade" ORDER BY "topoGrade" ASC`
  ).map(({ topoGrade, count }) => [topoGrade, count])

module.exports = {
  create,
  createMany,
  findAll,
  numberOfAscentsFirstGoByGrade,
  numberOfAscentsSecondGoOrMoreByGrade,
  getGrades,
  findAllFromUserId,
  destroy,
}
